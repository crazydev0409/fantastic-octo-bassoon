# AI Resume Tailor

An AI-powered web application that helps you tailor your resume for any job description using DeepSeek AI.

## Features

- 📝 **Multiple Tabs**: Work on multiple resumes simultaneously with unlimited tabs
- 🤖 **AI-Powered**: Uses DeepSeek AI to intelligently tailor your resume
- 📄 **PDF Export**: Download tailored resumes as professionally formatted PDFs
- ⌨️ **Keyboard Shortcuts**: Efficient workflow with comprehensive keyboard shortcuts
- 📊 **History Tracking**: Keep track of all generated resumes
- 🎨 **Modern UI**: Beautiful dark-themed interface
- ⚙️ **Customizable**: Configure your own API settings

## Keyboard Shortcuts

- `Ctrl + Shift + E` - New Tab
- `Ctrl + Shift + X` - Close Tab  
- `Ctrl + Shift + P` - Download PDF
- `Ctrl + Enter` - Tailor Resume

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder:

```bash
cd ai-resume-tailor
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Configuration

The application comes pre-configured with DeepSeek API settings. You can modify these in the API Settings dialog:

- **API Key**: Your DeepSeek API key
- **API URL**: `https://api.deepseek.com`
- **Model**: `deepseek-chat`

## Usage

1. **Enter Base Resume**: Paste your base resume in Markdown format in the left panel
2. **Add Job Description**: Paste the job description for the position you're applying to
3. **Generate**: Click "Tailor My Resume" or press `Ctrl + Enter`
4. **Review**: Your tailored resume will appear in the right panel
5. **Download**: Click "Download PDF" or press `Ctrl + Shift + P` to save as PDF

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **jsPDF** - PDF generation
- **Lucide React** - Icons
- **DeepSeek API** - AI integration

## License

MIT License

## Support

For issues or questions, please open an issue on the repository.
