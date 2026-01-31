import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import type { Grade } from '../types';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface TextItem {
  str: string;
  transform: number[];
}

const sanitizeGrade = (val: string): number | null => {
  if (!val || val === 'NG') return null;
  const grade = parseFloat(val.replace(',', '.'));
  return isNaN(grade) ? null : grade;
};

const getLinesFromPage = async (page: pdfjs.PDFPageProxy): Promise<string[]> => {
  const textContent = await page.getTextContent();
  const items = textContent.items as unknown as TextItem[];
  
  const linesMap = new Map<number, TextItem[]>();
  items.forEach((item) => {
    const y = Math.round(item.transform[5]);
    const line = linesMap.get(y) || [];
    line.push(item);
    linesMap.set(y, line);
  });

  const sortedY = Array.from(linesMap.keys()).sort((a, b) => b - a);
  return sortedY.map((y) => {
    const lineItems = (linesMap.get(y) || []).sort((a, b) => a.transform[4] - b.transform[4]);
    return lineItems.map((item) => item.str).join('   ');
  });
};

export const parsePastYears = async (arrayBuffer: ArrayBuffer): Promise<Grade[]> => {
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  const grades: Grade[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const lines = await getLinesFromPage(page);
    
    for (const lineText of lines) {
      const match = lineText.match(/(\d{2}-\d{2})\s+\d+\s+[\d,.]+\s+([\d,.]+)\s+(?:B\s+)?(.*?)\s{2,}(NG|[\d,.]+)\s+[A-Z]/);
      
      if (!match) continue;

      const year = match[1];
      const weight = parseFloat(match[2].replace(',', '.'));
      const subject = match[3].trim();
      const res1Str = match[4];
      
      const parts = lineText.split(/\s{2,}/);
      const res2Str = parts.length > 9 ? parts[9] : null;

      const gradeValue = sanitizeGrade(res2Str || '') ?? sanitizeGrade(res1Str);

      if (gradeValue !== null) {
        grades.push({ year, subject, weight, grade: gradeValue });
      }
    }
  }

  return grades;
};

export const parseThisYear = async (arrayBuffer: ArrayBuffer): Promise<Grade[]> => {
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  const grades: Grade[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const lines = await getLinesFromPage(page);

    let currentSubject = '';
    let currentWeight = 0;

    for (let j = 0; j < lines.length; j++) {
      const line = lines[j];
      const subjectMatch = line.match(/\d+:\s+(.*?)\s+\(studiepunten:\s+\d+\s+-\s+gewicht:\s+(\d+)\)/i);
      
      if (subjectMatch) {
        currentSubject = subjectMatch[1].trim();
        currentWeight = parseInt(subjectMatch[2]);
        continue;
      }

      if (!currentSubject || !line.toLowerCase().includes('eerste examenkans')) continue;

      const gradeInCurrent = line.match(/(\d{1,2}(?:[\.,]\d{1,2})?)/);
      const gradeInPrev = j > 0 ? lines[j-1].match(/(\d{1,2}(?:[\.,]\d{1,2})?)$/) : null;
      const finalGradeMatch = gradeInCurrent || gradeInPrev;
      
      if (!finalGradeMatch) continue;

      const gradeValue = parseFloat(finalGradeMatch[1].replace(',', '.'));
      if (gradeValue <= 20) {
        grades.push({
          subject: currentSubject,
          grade: gradeValue,
          weight: currentWeight,
          year: 'Current'
        });
        currentSubject = '';
      }
    }
  }

  return grades;
};