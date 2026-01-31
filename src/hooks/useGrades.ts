import { useState, useMemo } from 'react';
import type { Grade, FileUploadType } from '../types';
import { parsePastYears, parseThisYear } from '../utils/pdfParser';
import { calculateWeightedAverage, calculatePercentage, getDistinctionLevel } from '../utils/calculations';

export const useGrades = () => {
  const [pastGrades, setPastGrades] = useState<Grade[]>([]);
  const [thisYearGrades, setThisYearGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allGrades = useMemo(() => [...pastGrades, ...thisYearGrades], [pastGrades, thisYearGrades]);
  
  const average = useMemo(() => calculateWeightedAverage(allGrades), [allGrades]);
  const percentage = useMemo(() => calculatePercentage(average), [average]);
  const distinction = useMemo(() => getDistinctionLevel(percentage), [percentage]);
  const hasResults = allGrades.length > 0;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: FileUploadType) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const grades = type === 'past' 
        ? await parsePastYears(arrayBuffer) 
        : await parseThisYear(arrayBuffer);
      
      if (type === 'past') {
        setPastGrades(grades);
      } else {
        setThisYearGrades(grades);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Error parsing PDF: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    pastGrades,
    thisYearGrades,
    allGrades,
    average,
    percentage,
    distinction,
    loading,
    error,
    hasResults,
    handleFileUpload,
  };
};
