# 📝 Advanced Text Analyzer

A powerful **React** web app to analyze, transform, and extract insights from any text or document. Supports manual input and file uploads (TXT, PDF, DOCX), highlighting, translation, undo/redo, speech synthesis, and much more.

---

## 🚀 Live Demo

Try it instantly: [https://text-analyzer.toshankanwar.website](https://text-analyzer.toshankanwar.website)

---

## ✨ Features

- **Upload & Extract:** TXT, PDF, DOCX files (extracts text for analysis)
- **Manual Input:** Paste or write any text
- **Highlight Keyword:** Highlight words in your text
- **Text Transformations:** Uppercase, lowercase, capitalize, remove punctuation, reverse text, remove extra spaces
- **Text Analysis:**
  - Word, sentence, paragraph, character counts
  - Reading time estimate
  - Unique word count
  - Most frequent words
  - Average word length
  - Palindrome detection
  - Extract numbers, emails, URLs
  - Auto-summary
- **Undo/Redo:** Step back and forward through changes
- **Copy & Remove:** Copy all text, clear textarea
- **Capitalize Sentences:** Capitalizes first word of every sentence (like natural English)
- **Translation:** Instantly switch text between Hindi and English (powered by [LibreTranslate](https://libretranslate.com/))
- **Speech Synthesis:** Read text aloud (English/Hindi) in your browser
- **Responsive UI:** Modern, dark/light theme, mobile-friendly
- **Accessibility:** Keyboard and focus optimized

---

## 🖼️ Screenshots

![Text Analyzer Screenshot 1](https://text-analyzer.toshankanwar.website/readme/demo1.png)
![Text Analyzer Screenshot 2 ](https://text-analyzer.toshankanwar.website/readme/demo2.png)

---

## 📦 Installation

1. **Clone this repo:**
    ```sh
    git clone https://github.com/toshankanwar/Advance-Text-Analyzer.git
    cd Advance-Text-Analyzer
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the app:**
    ```sh
    npm run dev
    ```

4. **Open in browser:**  
   [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Tech Stack

- React (functional components, hooks)
- pdfjs-dist (PDF parsing)
- mammoth (DOCX parsing)
- LibreTranslate API (for translation)
- SpeechSynthesis API (for text-to-speech)
- Modern CSS for UI/UX

---

## 🌐 Hosting

This app is **production-ready** and can be deployed to:
- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)
- Any static file host

---

## 🧩 API Integrations

- **LibreTranslate:** Used for Hindi-English translation.  
  If you want unlimited translation, run your own instance!  
  [LibreTranslate Self-host Docs](https://github.com/LibreTranslate/LibreTranslate)

- **pdfjs-dist:** Extracts text from PDFs client-side.
- **mammoth:** Extracts text from DOCX files client-side.

---

## 📄 How to Use

1. **Paste or upload text:**  
   Use the textarea or upload a document.

2. **Analyze & transform:**  
   Use buttons for analysis, transformation, highlighting.

3. **Translate:**  
   Instantly switch text language between Hindi & English.

4. **Listen:**  
   Use the "Speak" button to hear your text aloud.

5. **Undo/Redo:**  
   Go back and forward through edits.

---

## 🔒 Privacy & Security

- All processing happens **client-side** (in your browser).
- No text or files are sent to any server except for translation (LibreTranslate).
- For unlimited translation, run LibreTranslate locally.

---

## 📮 Contact & Support

- **Author:** Toshan kanwar
- **Email:** contact@toshankanwar.website
- **GitHub:** [@toshankanwar](https://github.com/toshankanwar)
- **Live Support:** [Contact Form](https://toshankanwar.website/#contact)

---

## 📝 License

MIT License (see [LICENSE](./LICENSE))

---

## 🤝 Contributing

Pull requests, issues, and feature suggestions welcome!

1. Fork the repo
2. Create your branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and create a PR

---

## ⭐ Credits

- [pdfjs-dist](https://github.com/mozilla/pdfjs-dist)
- [mammoth](https://github.com/mwilliamson/mammoth.js)
- [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate)

---

## 📢 Disclaimer

This project is for educational and personal use.
For commercial use or heavy translation, please self-host LibreTranslate and comply with their terms.

---