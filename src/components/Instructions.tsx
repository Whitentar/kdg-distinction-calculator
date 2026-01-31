import React from 'react';

interface InstructionsProps {
  isOpen: boolean;
}

export const Instructions: React.FC<InstructionsProps> = ({ isOpen }) => {
  return (
    <section className="mb-8">
      <details className="bg-amber-50 border border-amber-200 rounded-lg p-2" open={isOpen}>
        <summary 
          className="font-bold text-amber-900 cursor-pointer p-4 flex items-center justify-between list-none"
          tabIndex={0}
          aria-label="How to get your PDFs"
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to get your PDFs
          </span>
          <span className="text-amber-600 text-xs uppercase tracking-widest">
            {isOpen ? 'Click to hide' : 'Click to show'}
          </span>
        </summary>
        <div className="px-4 pb-4">
          <ol className="list-decimal list-inside space-y-2 text-amber-800 text-sm border-t border-amber-200 pt-4">
            <li>
              Go to <a href="https://e-studentservice.kdg.be/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-amber-600">e-studentservice.kdg.be</a> and log in.
            </li>
            <li>
              For past years: Click <strong>"Mijn studieoverzicht"</strong>, then click <strong>"Afdrukken (PDF)"</strong>.
            </li>
            <li>
              For current year: Click <strong>"Mijn punten"</strong>, then click <strong>"Afdrukken (PDF)"</strong>.
            </li>
            <li>
              Upload both files below to see your calculated distinction level.
            </li>
          </ol>
        </div>
      </details>
    </section>
  );
};
