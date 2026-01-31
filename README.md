# KdG Graduation Distinction Calculator

An unofficial, weight-based calculation tool for KdG University of Applied Sciences and Arts Bachelor degrees. This tool helps students calculate their weighted average and projected distinction level by parsing official PDF transcripts.

## 🚀 Features

- **Automated PDF Parsing**: Extract grades directly from official KdG "Studieoverzicht" and "Resultaten" PDF files.
- **Weighted Calculations**: Automatically handles subject weights (ECTS/credits) to provide an accurate weighted average.
- **Distinction Forecasting**: Determines your distinction level (Voldoende, Onderscheiding, etc.) based on KdG's official grading scales.
- **Progress Tracking**: Provides a detailed breakdown of all parsed subjects across different academic years.
- **Privacy First**: All processing is done locally in your browser. Your data never leaves your machine.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strictly typed, SOLID principles)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **PDF Engine**: [PDF.js](https://mozilla.github.io/pdf.js/)
- **Bundler**: [Vite](https://vitejs.dev/)

## 📋 How to Use

1. **Download your PDFs**:
   - Log in to [e-studentservice.kdg.be](https://e-studentservice.kdg.be/).
   - **Past Years**: Go to "Mijn studieoverzicht" and click "Afdrukken (PDF)".
   - **Current Year**: Go to "Mijn punten" and click "Afdrukken (PDF)".
2. **Upload**: Drop the files into the respective upload zones in the application.
3. **Analyze**: View your weighted average, percentage, and calculated distinction level instantly.

## 📐 Grading Scale

The tool uses the following KdG distinction thresholds:

| Percentage | Distinction Level |
| :--- | :--- |
| < 50% | Failed |
| 50% - 67.9% | Satisfactory |
| 68% - 76.9% | Distinction |
| 77% - 84.9% | Great Distinction |
| ≥ 85% | Greatest Distinction |

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ⚖️ Disclaimer

This is an **unofficial tool** developed for student convenience. While it aims for 100% accuracy, always refer to your official KdG student portal and the academic regulations for definitive results.

---

Developed by **Nichola Bauwelinck** using **Gemini-3-flash-preview**
