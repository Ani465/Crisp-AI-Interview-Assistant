pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
// Vite/React: pdf.worker.entry may not exist. Use CDN fallback or adjust as needed for your build tool.
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const phoneRegex = /(\+?\d{1,3}[\s-]?)?\d{10}/; // simple India-friendly pattern
const nameRegex =
  /(?:Name|Candidate|Full Name)\s*:\s*([A-Za-z][A-Za-z\s.'-]+)/i;

export async function parsePDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it) => it.str).join(" ") + "\n";
  }
  return extractFields(text);
}

export async function parseDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const { value } = await mammoth.extractRawText({ arrayBuffer });
  return extractFields(value);
}

function extractFields(text) {
  const email = (text.match(emailRegex) || [])[0] || null;
  const phone = (text.match(phoneRegex) || [])[0] || null;
  let name = null;

  const nameMatch = text.match(nameRegex);
  if (nameMatch) name = nameMatch[1].trim();
  else {
    // heuristic: first line with two tokens starting uppercase
    const lines = text.split("\n").map((l) => l.trim());
    const guess = lines.find((l) => /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+/.test(l));
    if (guess) name = guess.split(",")[0];
  }

  return { name, email, phone, rawText: text };
}
