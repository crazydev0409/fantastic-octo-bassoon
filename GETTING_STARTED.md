# Getting Started with AI Resume Tailor

## 🚀 Quick Start

Your AI Resume Tailor application is now ready! The development server should be running at:

**http://localhost:5173**

## ✨ Features Implemented

### 1. **Multiple Tabs Support**
   - Create unlimited tabs with `Ctrl + Shift + E`
   - Close tabs with `Ctrl + Shift + X`
   - Each tab maintains its own resume and job description
   - Tab names automatically update based on job description

### 2. **AI-Powered Resume Tailoring**
   - Uses DeepSeek API for intelligent resume optimization
   - Analyzes job descriptions to highlight relevant skills
   - Maintains original resume structure while optimizing content
   - Real-time generation with loading states

### 3. **PDF Export**
   - Professional PDF formatting
   - Download with `Ctrl + Shift + P`
   - Preserves markdown formatting
   - Filename includes company name

### 4. **Keyboard Shortcuts**
   - `Ctrl + Shift + E` - New Tab
   - `Ctrl + Shift + X` - Close Tab
   - `Ctrl + Shift + P` - Download PDF
   - `Ctrl + Enter` - Tailor Resume
   - Access shortcuts modal from header

### 5. **History Tracking**
   - Automatically saves all generated resumes
   - View history from header button
   - Shows timestamp and company name
   - Clear history functionality

### 6. **Settings & Configuration**
   - Customizable API settings
   - Pre-configured with DeepSeek API
   - Persistent storage using localStorage
   - Easy API key management

## 🎨 UI Features

- **Dark Theme**: Professional dark-themed interface
- **Responsive Layout**: Split-panel design for optimal workflow
- **Loading States**: Visual feedback during generation
- **Custom Scrollbars**: Styled scrollbars for better UX
- **Modal Dialogs**: Settings, Shortcuts, and History modals

## 📝 How to Use

1. **Enter Base Resume**:
   - Paste your resume in Markdown format in the left panel
   - Use the pre-filled sample or replace with your own

2. **Add Job Description**:
   - Paste the target job description
   - Include company name for better tab naming

3. **Generate**:
   - Click "Tailor My Resume" button
   - Or press `Ctrl + Enter`
   - Wait for AI to process (usually 5-10 seconds)

4. **Review & Download**:
   - Review the tailored resume in the right panel
   - Click "Download PDF" or press `Ctrl + Shift + P`
   - PDF will download with company-specific filename

5. **Work in Parallel**:
   - Open new tabs for different applications
   - Each tab works independently
   - Switch between tabs easily

## 🔧 Configuration

The application comes pre-configured with DeepSeek API settings:
- **API Key**: sk-82b7ec888c2b44c69cea09ff8aa833a8
- **API URL**: https://api.deepseek.com
- **Model**: deepseek-chat

You can modify these settings by:
1. Click "API Settings" dropdown at the bottom
2. Click "Settings"
3. Update your credentials
4. Click "Save Settings"

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
ai-resume-tailor/
├── src/
│   ├── components/         # React components
│   │   ├── TabManager.tsx
│   │   ├── ResumeTailor.tsx
│   │   ├── SettingsModal.tsx
│   │   ├── ShortcutsModal.tsx
│   │   └── HistoryModal.tsx
│   ├── utils/             # Utilities
│   │   └── pdfGenerator.ts
│   ├── App.tsx            # Main app component
│   ├── types.ts           # TypeScript types
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Tips for Best Results

1. **Resume Format**: Use Markdown format for better PDF generation
   - Use `#` for main headings
   - Use `##` for section headings
   - Use `-` for bullet points

2. **Job Descriptions**: Include complete job descriptions for better tailoring
   - Company name helps with tab naming
   - More details = better optimization

3. **Review Output**: Always review the generated resume before sending
   - AI suggestions are starting points
   - Customize further if needed

## 🚨 Troubleshooting

**Server won't start?**
```bash
cd C:\Users\Steven\ai-resume-tailor
npm install
npm run dev
```

**API not working?**
- Check API key in settings
- Verify internet connection
- Check DeepSeek API status

**PDF not downloading?**
- Make sure you have a generated resume
- Check browser download settings
- Try different browser if issues persist

## 📞 Support

For issues or questions, check the main README.md or review the code comments.

---

**Enjoy your AI-powered resume tailoring experience!** 🎉
