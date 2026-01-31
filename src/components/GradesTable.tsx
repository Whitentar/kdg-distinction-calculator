import React from 'react';
import type { Grade } from '../types';
import { KDG_NAVY } from '../constants/colors';

interface GradesTableProps {
  grades: Grade[];
}

export const GradesTable: React.FC<GradesTableProps> = ({ grades }) => {
  if (grades.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-bold" style={{ color: KDG_NAVY }}>Study Progress Detail</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
              <th className="px-6 py-3">Year</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Credits</th>
              <th className="px-6 py-3">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {grades.map((grade, idx) => (
              <tr key={`${grade.subject}-${idx}`} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-500">{grade.year}</td>
                <td className="px-6 py-4 text-sm font-semibold" style={{ color: KDG_NAVY }}>{grade.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{grade.credits}</td>
                <td className="px-6 py-4 text-sm font-bold">
                  <span 
                    className={grade.grade < 10 ? 'text-red-600' : ''}
                    style={grade.grade >= 10 ? { color: KDG_NAVY } : {}}
                  >
                    {grade.grade.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

