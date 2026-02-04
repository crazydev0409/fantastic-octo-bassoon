import jsPDF from 'jspdf';

export interface PDFOptions {
  content: string;
  filename: string;
}

interface ParsedContent {
  name: string;
  contactInfo: string[];
  title: string;
  sections: Array<{
    type: 'section' | 'experience' | 'education';
    title: string;
    content: string[];
  }>;
}

export function generateResumePDF({ content, filename }: PDFOptions) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Page settings
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // EnhanceCV-inspired color scheme
  const primaryColor: [number, number, number] = [101, 67, 33]; // Professional brown
  const accentColor: [number, number, number] = [52, 73, 94]; // Dark slate
  const textColor: [number, number, number] = [44, 62, 80]; // Dark text
  const lightTextColor: [number, number, number] = [127, 140, 141]; // Gray text
  const fontFamily = 'arial';
  // Helper function to check if we need a new page
  const checkNewPage = (neededSpace: number) => {
    if (yPosition + neededSpace > pageHeight - 15) { // Reduced bottom padding (was margin + 10)
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper to strip markdown formatting
  const stripMarkdown = (text: string): string => {
    return text
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/\#{1,6}\s*/g, '') // Remove all heading markers (including in middle of text)
      .replace(/^[-*+]\s+/g, '') // Remove bullet markers at start
      .trim();
  };

  // Helper to check if line is a skills category (e.g., "Programming & Development: Python, Java...")
  const isSkillsCategory = (text: string): boolean => {
    return /^[A-Za-z\s&]+:\s+/.test(text);
  };

  // Helper to detect if a line is actual contact information
  const isContactInfoLine = (line: string, lineNumber: number): boolean => {
    const lower = line.toLowerCase();

    // Must contain contact-related keywords OR look like email/phone/URL
    const hasContactKeywords = (
      lower.includes('email') ||
      lower.includes('phone') ||
      lower.includes('linkedin') ||
      lower.includes('github') ||
      lower.includes('portfolio') ||
      lower.includes('website') ||
      lower.includes('www.') ||
      lower.includes('http') ||
      /@/.test(line) ||
      /\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(line) ||
      /\[\w+\]\(http/.test(line) // Markdown links
    );

    // Only accept as contact info if:
    // 1. It has contact keywords/patterns, AND
    // 2. It's within the first 5 lines of the document (should be near top)
    return hasContactKeywords && lineNumber < 5;
  };

  // Parse content into structured sections
  const parseContent = (text: string): ParsedContent => {
    const lines = text.split('\n');
    const parsed: ParsedContent = {
      name: '',
      contactInfo: [],
      title: '',
      sections: []
    };

    let currentSection: any = null;
    let inHeader = true;
    let foundFirstSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) continue;

      // Extract name (first # heading)
      if (line.startsWith('# ') && !parsed.name) {
        parsed.name = stripMarkdown(line.substring(2));
        continue;
      }

      // Contact info line - ONLY if in header AND looks like contact info
      if (inHeader && !foundFirstSection && parsed.name && isContactInfoLine(line, i)) {
        parsed.contactInfo.push(line);
        continue;
      }

      // Horizontal rule
      if (line.match(/^[-=]{3,}$/)) {
        inHeader = false;
        continue;
      }

      // Section headers (## or ###) - this marks end of header
      if (line.startsWith('## ') || line.startsWith('### ')) {
        foundFirstSection = true;
        inHeader = false;
      }

      // Job title or professional summary (after name, before sections)
      if (inHeader && line.startsWith('### ')) {
        parsed.title = stripMarkdown(line.substring(4));
        inHeader = false;
        continue;
      }

      // Section headers (### or ##) - but NOT if they contain ** (which indicates it's a job title)
      if ((line.startsWith('### ') || line.startsWith('## ')) && !inHeader) {
        const headerText = line.startsWith('### ') ? line.substring(4) : line.substring(3);

        // If header contains **, it's likely a job title, not a section header
        // Also check if it's a known section name
        const knownSections = [
          'experience', 'professional experience', 'work experience',
          'skills', 'technical skills', 'core competencies',
          'summary', 'professional summary', 'profile',
          'education', 'academic', 'certifications', 'certificates',
          'projects', 'achievements', 'awards'
        ];

        const isRealSection = knownSections.some(s =>
          stripMarkdown(headerText).toLowerCase().includes(s)
        );

        // If it's not a known section OR contains **, treat it as content
        if (!isRealSection || headerText.includes('**')) {
          if (currentSection) {
            currentSection.content.push(lines[i]);
          }
          continue;
        }

        // It's a real section header
        if (currentSection) {
          parsed.sections.push(currentSection);
        }
        currentSection = {
          type: 'section',
          title: stripMarkdown(headerText),
          content: []
        };
        continue;
      }

      // Add content to current section
      if (currentSection) {
        currentSection.content.push(lines[i]); // Keep original indentation
      } else if (!inHeader) {
        // Content before any section (like professional summary)
        if (!parsed.sections.length || parsed.sections[0].title !== 'Summary') {
          parsed.sections.unshift({
            type: 'section',
            title: '',
            content: []
          });
        }
        parsed.sections[0].content.push(lines[i]);
      }
    }

    if (currentSection) {
      parsed.sections.push(currentSection);
    }

    // If no sections were found, create one section with all remaining content
    if (parsed.sections.length === 0 && lines.length > 0) {
      const remainingContent: string[] = [];
      let foundName = false;
      let foundContact = false;

      for (let idx = 0; idx < lines.length; idx++) {
        const line = lines[idx];
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith('# ') && !foundName) {
          foundName = true;
          continue;
        }

        if (foundName && !foundContact && isContactInfoLine(trimmed, idx)) {
          foundContact = true;
          continue;
        }

        if (foundName) {
          remainingContent.push(line);
        }
      }

      if (remainingContent.length > 0) {
        parsed.sections.push({
          type: 'section',
          title: '',
          content: remainingContent
        });
      }
    }

    // Reorder sections: Summary → Skills → Experience → Education → Certifications
    const sectionOrder = [
      'summary',
      'professional summary',
      'profile',
      'skills',
      'technical skills',
      'core competencies',
      'experience',
      'professional experience',
      'work experience',
      'education',
      'academic',
      'certifications',
      'certificates'
    ];

    parsed.sections.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      let aIndex = sectionOrder.findIndex(s => aTitle.includes(s) || s.includes(aTitle));
      let bIndex = sectionOrder.findIndex(s => bTitle.includes(s) || s.includes(bTitle));

      // If not found in order list, put at end
      if (aIndex === -1) aIndex = 999;
      if (bIndex === -1) bIndex = 999;

      return aIndex - bIndex;
    });

    return parsed;
  };

  const parsed = parseContent(content);

  // Render header with name and contact info
  if (parsed.name) {
    // Add more padding above name
    yPosition += 6;

    // Name - RIGHT-ALIGNED in primary color (brown)
    doc.setFontSize(24);
    doc.setFont(fontFamily, 'bold');
    doc.setTextColor(...primaryColor);
    const nameWidth = doc.getTextWidth(parsed.name.toUpperCase());
    doc.text(parsed.name.toUpperCase(), pageWidth - margin - nameWidth, yPosition);
    yPosition += 8;

    // Contact info - RIGHT-ALIGNED horizontally
    if (parsed.contactInfo.length > 0) {
      doc.setFontSize(9);
      doc.setFont(fontFamily, 'normal');
      doc.setTextColor(...textColor);

      // Combine all contact lines and parse
      const contactLine = parsed.contactInfo.join(' ');
      const contactParts = contactLine.split('|').map(p => p.trim());

      // Extract clean contact details with URLs
      interface ContactPart {
        text: string;
        url?: string;
      }

      const cleanedParts: ContactPart[] = [];
      for (const part of contactParts) {
        // Remove markdown bold markers and labels
        let cleaned = part
          .replace(/\*\*/g, '')
          .replace(/^(Georgia Location|Location|Phone|Email|LinkedIn|GitHub|Portfolio):\s*/i, '');

        // Extract URL from markdown links [text](url)
        const linkMatch = cleaned.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const url = linkMatch[2];
          // For LinkedIn, show full URL without https://
          let displayText = linkMatch[1];
          if (url.includes('linkedin.com')) {
            displayText = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
          }
          cleanedParts.push({ text: displayText, url: url });
        } else {
          cleaned = cleaned.trim();
          if (cleaned && !cleaned.match(/^https?:\/\//)) { // Skip raw URLs
            cleanedParts.push({ text: cleaned });
          }
        }
      }

      // Create contact line with bullet separators - right-aligned
      const separator = ' • ';
      let contactText = '';
      const links: Array<{ text: string, url: string, x: number, y: number, width: number }> = [];

      for (let i = 0; i < cleanedParts.length; i++) {
        if (i > 0) contactText += separator;
        contactText += cleanedParts[i].text;
      }

      // Right-align the contact line
      const contactWidth = doc.getTextWidth(contactText);
      const startX = pageWidth - margin - contactWidth;

      // Render text and track link positions
      let currentX = startX;
      for (let i = 0; i < cleanedParts.length; i++) {
        if (i > 0) {
          doc.text(separator, currentX, yPosition);
          currentX += doc.getTextWidth(separator);
        }

        const partWidth = doc.getTextWidth(cleanedParts[i].text);

        // If this part has a URL, store it for link creation
        if (cleanedParts[i].url) {
          links.push({
            text: cleanedParts[i].text,
            url: cleanedParts[i].url!,
            x: currentX,
            y: yPosition,
            width: partWidth
          });
        }

        doc.text(cleanedParts[i].text, currentX, yPosition);
        currentX += partWidth;
      }

      // Add clickable links
      for (const link of links) {
        doc.link(link.x, link.y - 3, link.width, 4, { url: link.url });
      }

      yPosition += 6;
    }

    // Divider line
    doc.setDrawColor(...textColor);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;
  }

  // Professional title - LEFT-ALIGNED in black
  if (parsed.title) {
    doc.setFontSize(14);
    doc.setFont(fontFamily, 'bold');
    doc.setTextColor(0, 0, 0); // Black
    doc.text(parsed.title, margin, yPosition);
    yPosition += 10;
  }

  // Render sections
  for (const section of parsed.sections) {
    // Skip empty sections (especially certifications if not present)
    const hasContent = section.content && section.content.some((line: string) => line.trim().length > 0);
    if (!hasContent) {
      continue;
    }

    checkNewPage(15);

    // Section title
    if (section.title) {
      const cleanTitle = stripMarkdown(section.title); // Extra cleanup
      doc.setFontSize(12);
      doc.setFont(fontFamily, 'bold');
      doc.setTextColor(...primaryColor);
      doc.text(cleanTitle.toUpperCase(), margin, yPosition);

      // Underline
      const titleWidth = doc.getTextWidth(cleanTitle.toUpperCase());
      yPosition += 1.5;
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.4);
      doc.line(margin, yPosition, margin + titleWidth, yPosition);
      yPosition += 6;
    }

    // Check if this is a skills section or summary section
    const isSkillsSection = section.title.toLowerCase().includes('skill');
    const isSummarySection = section.title.toLowerCase().includes('summary') ||
      section.title.toLowerCase().includes('profile');

    // Section content
    for (let i = 0; i < section.content.length; i++) {
      const line = section.content[i];
      let trimmed = line.trim();

      // Skip lines that are just section headers (shouldn't be here but just in case)
      if (trimmed.match(/^#{2,6}\s+/)) {
        continue;
      }

      if (!trimmed) {
        yPosition += 2;
        continue;
      }

      checkNewPage(10);

      // PRIORITY #1: Summary/Profile section paragraphs (process FIRST to avoid wrong matching)
      if (isSummarySection && !trimmed.startsWith('**') && !trimmed.startsWith('- ') &&
        !trimmed.startsWith('• ') && !trimmed.startsWith('*   ') && !isSkillsCategory(trimmed)) {
        // Reset font completely
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...textColor);

        // Keep bold markers for rendering
        let cleanedText = trimmed.replace(/^#{1,6}\s*/g, '');

        // Wrap text WITHOUT bold markers for accurate width calculation
        const textWithoutBold = cleanedText.replace(/\*\*/g, '');
        const wrappedLines = doc.splitTextToSize(textWithoutBold, contentWidth - 5);

        // Now render each line, preserving bold from original text
        let charPosition = 0; // Track position in text WITHOUT markers

        for (const wrappedLine of wrappedLines) {
          checkNewPage(5);

          // Find where this line starts and ends in the original text (with markers)
          let sourceText = '';
          let charsCollected = 0;
          let sourceIdx = 0;
          let sourceCharCount = 0;

          // Navigate to our current position in the marked-up text
          while (sourceCharCount < charPosition && sourceIdx < cleanedText.length) {
            if (cleanedText.substring(sourceIdx, sourceIdx + 2) === '**') {
              sourceIdx += 2;
            } else {
              sourceCharCount++;
              sourceIdx++;
            }
          }

          // Collect characters for this line (including bold markers)
          while (charsCollected < wrappedLine.length && sourceIdx < cleanedText.length) {
            if (cleanedText.substring(sourceIdx, sourceIdx + 2) === '**') {
              sourceText += '**';
              sourceIdx += 2;
            } else {
              sourceText += cleanedText[sourceIdx];
              charsCollected++;
              sourceIdx++;
            }
          }

          charPosition += wrappedLine.length;

          // Skip one space between lines (jsPDF adds spaces when wrapping)
          if (charPosition < textWithoutBold.length && textWithoutBold[charPosition] === ' ') {
            charPosition++;
          }

          // Render this line with bold support
          if (sourceText.includes('**')) {
            let xPos = margin;
            const parts = sourceText.split('**');

            for (let k = 0; k < parts.length; k++) {
              if (parts[k]) {
                doc.setFont(fontFamily, k % 2 === 1 ? 'bold' : 'normal');
                const partWidth = doc.getTextWidth(parts[k]);

                // Safety: only render if within bounds
                if (xPos + partWidth <= pageWidth - margin) {
                  doc.text(parts[k], xPos, yPosition);
                  xPos += partWidth;
                }
              }
            }
          } else {
            doc.setFont(fontFamily, 'normal');
            doc.text(wrappedLine, margin, yPosition);
          }

          yPosition += 5;
        }

        yPosition += 2;
        continue;
      }

      // Skills category line (e.g., "Programming & Development: Python, Java, ...")
      if (isSkillsSection && isSkillsCategory(trimmed)) {
        const match = trimmed.match(/^([^:]+):\s*(.+)$/);
        if (match) {
          const [, category, skills] = match;

          doc.setFontSize(10);
          doc.setTextColor(...textColor);

          // Category label (bold)
          doc.setFont(fontFamily, 'bold');
          const categoryText = stripMarkdown(category) + ':';
          doc.text(categoryText, margin, yPosition);

          // Skills list (normal font, NO bold) - render on same line if possible, or wrap
          doc.setFont(fontFamily, 'normal');
          const cleanSkills = stripMarkdown(skills);

          const categoryWidth = doc.getTextWidth(categoryText);
          const firstLineMaxWidth = contentWidth - categoryWidth - 2;

          // Try to fit on same line as category
          const skillsWidth = doc.getTextWidth(' ' + cleanSkills);

          if (skillsWidth <= firstLineMaxWidth) {
            // Fits on same line
            doc.text(' ' + cleanSkills, margin + categoryWidth, yPosition);
            yPosition += 5;
          } else {
            // Need to wrap
            yPosition += 5;
            const wrappedSkills = doc.splitTextToSize(cleanSkills, contentWidth - 4);

            for (const skillLine of wrappedSkills) {
              checkNewPage(4);
              doc.text(skillLine, margin + 2, yPosition);
              yPosition += 4.5;
            }
          }

          yPosition += 1; // Small space after each category
        }
        continue;
      }

      // Job title or degree/role (bold lines that aren't bullets)
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const text = stripMarkdown(trimmed);

        // Check if next line has company/institution | date format
        let isJobTitle = false;
        if (i + 1 < section.content.length) {
          const nextLine = section.content[i + 1].trim();
          if (nextLine.match(/^[^-•*].+\|\s*.+$/) || nextLine.match(/^\w+/)) {
            isJobTitle = true;
          }
        }

        if (isJobTitle) {
          yPosition += 2;
          doc.setFontSize(10.5);
          doc.setFont(fontFamily, 'bold');
          doc.setTextColor(...accentColor);
          doc.text(text, margin, yPosition);
          yPosition += 5;
        } else {
          doc.setFontSize(9.5);
          doc.setFont(fontFamily, 'bold');
          doc.setTextColor(...textColor);
          doc.text(text, margin, yPosition);
          yPosition += 5;
        }
        continue;
      }

      // Company | Date or University Name or plain date line
      if (trimmed.match(/^[^-•*].+\|\s*.+$/)) {
        const parts = trimmed.split('|').map(p => stripMarkdown(p));
        doc.setFontSize(9);
        doc.setTextColor(...lightTextColor);
        doc.setFont(fontFamily, 'italic');

        doc.text(parts[0], margin, yPosition);

        if (parts[1]) {
          const dateWidth = doc.getTextWidth(parts[1]);
          doc.text(parts[1], pageWidth - margin - dateWidth, yPosition);
        }
        yPosition += 6;
        continue;
      }

      // Certification line (e.g., "AWS Solutions Architect – 07/2022")
      if (!trimmed.startsWith('**') && !trimmed.startsWith('#') &&
        trimmed.match(/^[\w\s\(\)]+\s*[–-]\s*\d{2}\/\d{4}$/)) {
        doc.setFontSize(9);
        doc.setTextColor(...textColor);

        const parts = trimmed.split(/\s*[–-]\s*(?=\d{2}\/\d{4}$)/);
        if (parts.length === 2) {
          doc.setFont(fontFamily, 'bold');
          doc.text(stripMarkdown(parts[0]), margin, yPosition);

          doc.setFont(fontFamily, 'normal');
          doc.setTextColor(...lightTextColor);
          const dateWidth = doc.getTextWidth(parts[1]);
          doc.text(parts[1], pageWidth - margin - dateWidth, yPosition);
        } else {
          doc.setFont(fontFamily, 'normal');
          doc.text(stripMarkdown(trimmed), margin, yPosition);
        }

        yPosition += 5;
        continue;
      }

      // Institution/Company name or date without pipe (italic gray text)
      if (!trimmed.startsWith('**') && !trimmed.startsWith('#') &&
        (trimmed.match(/^\w+[\w\s]+(?:University|College|Institute|Ltd|Inc|Corp|Technologies|Systems)/i) ||
          trimmed.match(/^\d{4}\s*[-–]\s*\d{4}$/) ||
          trimmed.match(/^\d{2}\/\d{4}\s*[-–]\s*\d{2}\/\d{4}$/))) {
        doc.setFontSize(9);
        doc.setTextColor(...lightTextColor);
        doc.setFont(fontFamily, 'italic');

        const cleanText = stripMarkdown(trimmed);

        // Check if it's a date range
        if (trimmed.match(/^\d{4}\s*[-–]\s*\d{4}$/) || trimmed.match(/^\d{2}\/\d{4}/)) {
          const dateWidth = doc.getTextWidth(cleanText);
          doc.text(cleanText, pageWidth - margin - dateWidth, yPosition);
        } else {
          doc.text(cleanText, margin, yPosition);
        }

        yPosition += 6;
        continue;
      }

      // Bullet points
      if (trimmed.startsWith('*   ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        let bulletText = trimmed
          .replace(/^\*\s+/, '')
          .replace(/^-\s+/, '')
          .replace(/^•\s+/, '')
          .replace(/^#{1,6}\s*/g, ''); // Remove any stray # symbols

        doc.setFontSize(10);
        doc.setFont(fontFamily, 'normal');
        doc.setTextColor(...textColor);

        // Circular bullet (like reference PDF)
        doc.setFillColor(0, 0, 0);
        doc.circle(margin + 2, yPosition - 1.5, 0.7, 'F');

        // Parse and render text with bold support
        const wrappedLines = doc.splitTextToSize(bulletText, contentWidth - 10);

        for (let j = 0; j < wrappedLines.length; j++) {
          checkNewPage(5);

          // Handle inline bold with ** markers
          const lineTxt = wrappedLines[j];
          let xPos = margin + 7;

          if (lineTxt.includes('**')) {
            const parts = lineTxt.split('**');
            for (let k = 0; k < parts.length; k++) {
              if (parts[k]) {
                doc.setFont(fontFamily, k % 2 === 1 ? 'bold' : 'normal');
                doc.text(parts[k], xPos, yPosition);
                xPos += doc.getTextWidth(parts[k]);
              }
            }
          } else {
            doc.text(lineTxt, margin + 7, yPosition);
          }

          yPosition += 5;
        }
        yPosition += 1.5;
        continue;
      }

      // Regular paragraph text (for other sections like Education description, etc.)
      doc.setFont(fontFamily, 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...textColor);

      // Remove any stray markdown symbols - strip bold markers for reliability
      const cleanedText = trimmed
        .replace(/^#{1,6}\s*/g, '')
        .replace(/\*\*/g, '');

      // Use jsPDF's reliable text wrapping
      const wrappedText = doc.splitTextToSize(cleanedText, contentWidth - 5);

      for (const line of wrappedText) {
        checkNewPage(5);
        doc.setFont(fontFamily, 'normal');
        doc.text(line, margin, yPosition);
        yPosition += 4.5;
      }

      yPosition += 1.5;
    }

    yPosition += 4;
  }

  // Clean footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(...lightTextColor);
    doc.setFont(fontFamily, 'normal');
    doc.text(`${i}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
  }

  // Save the PDF
  doc.save(filename);
}

// Initialize PDF download listener
if (typeof window !== 'undefined') {
  window.addEventListener('download-pdf', ((event: CustomEvent) => {
    const { content, filename } = event.detail;
    generateResumePDF({ content, filename });
  }) as EventListener);
}
