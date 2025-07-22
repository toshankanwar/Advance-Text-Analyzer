/**
 * Advanced Text Analysis Utility Functions
 */

export function wordCount(text) {
    return text.trim()
      ? text.trim().split(/\s+/).length
      : 0;
  }
  
  export function charCount(text) {
    return text.length;
  }
  
  export function sentenceCount(text) {
    // Splits by ., !, ? followed by space or end of string
    const sentences = text.match(/[^\.!\?]+[\.!\?]+(\s|$)/g);
    return sentences ? sentences.length : 0;
  }
  
  export function paragraphCount(text) {
    // Paragraphs separated by two or more newlines
    const paragraphs = text.trim().split(/\n{2,}/);
    return paragraphs.filter(p => p.trim().length > 0).length;
  }
  
  export function readingTime(text, wpm=200) {
    // Average adult reads ~200 wpm
    const words = wordCount(text);
    return Math.ceil(words / wpm);
  }
  
  export function uniqueWordCount(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    return words ? new Set(words).size : 0;
  }
  
  export function mostFrequentWords(text, topN=3) {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    if (!words) return [];
    const freq = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN);
    return sorted;
  }
  
  export function avgWordLength(text) {
    const words = text.match(/\b\w+\b/g);
    if (!words || words.length === 0) return 0;
    const total = words.reduce((sum, w) => sum + w.length, 0);
    return (total / words.length).toFixed(2);
  }
  
  export function toUpperCase(text) {
    return text.toUpperCase();
  }
  
  export function toLowerCase(text) {
    return text.toLowerCase();
  }
  
  export function capitalizeText(text) {
    return text.replace(/\b\w/g, c => c.toUpperCase());
  }
  
  export function removeExtraSpaces(text) {
    return text.replace(/\s+/g, " ").trim();
  }
  
  export function highlightKeyword(text, keyword) {
    const safe = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safe})`, "gi");
    return text.replace(regex, '<mark>$1</mark>');
  }
  
  export function isPalindrome(text) {
    const clean = text.toLowerCase().replace(/[\W_]/g, "");
    return clean === clean.split("").reverse().join("");
  }
  
  export function reverseText(text) {
    return text.split("").reverse().join("");
  }
  
  export function removePunctuation(text) {
    return text.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "");
  }
  
  export function extractNumbers(text) {
    return text.match(/\d+/g) || [];
  }
  
  export function extractEmails(text) {
    return text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  }
  
  export function extractURLs(text) {
    return text.match(/https?:\/\/[^\s]+/g) || [];
  }
  
  export function summarizeText(text, maxLength=150) {
    // Basic summary: first sentence or first X chars
    const sentences = text.match(/[^\.!\?]+[\.!\?]+(\s|$)/g);
    if (sentences && sentences.length > 0) {
      return sentences[0].length > maxLength
        ? sentences[0].slice(0, maxLength) + "..."
        : sentences[0];
    }
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }