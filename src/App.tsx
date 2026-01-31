import React from 'react';
import { Layout } from './components/Layout';
import { Instructions } from './components/Instructions';
import { FileUploadCard } from './components/FileUploadCard';
import { ResultsOverview } from './components/ResultsOverview';
import { GradesTable } from './components/GradesTable';
import { useGrades } from './hooks/useGrades';
import { KDG_NAVY } from './constants/colors';

const App: React.FC = () => {
  const {
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
  } = useGrades();

  return (
    <Layout>
      <header className="mb-10">
        <h2 
          className="text-3xl font-extrabold mb-2"
          style={{ color: KDG_NAVY }}
        >
          Calculate your Distinction Level
        </h2>
        <p className="text-gray-600">
          A credit-based calculation tool for KdG Bachelor degrees, developed by Nichola Bauwelinck.
        </p>
      </header>

      <Instructions isOpen={!hasResults} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FileUploadCard 
          title="Past Years (Table Format)"
          step={1}
          type="past"
          onUpload={handleFileUpload}
          isLoaded={pastGrades.length > 0}
          itemCount={pastGrades.length}
        />
        <FileUploadCard 
          title="This Year (Block Format)"
          step={2}
          type="this"
          onUpload={handleFileUpload}
          isLoaded={thisYearGrades.length > 0}
          itemCount={thisYearGrades.length}
        />
      </div>

      {loading && (
        <div 
          className="flex items-center justify-center space-x-2 mb-8" 
          style={{ color: KDG_NAVY }}
          aria-live="polite"
        >
          <div 
            className="animate-spin rounded-full h-5 w-5 border-b-2"
            style={{ borderColor: KDG_NAVY }}
          ></div>
          <span>Analyzing grades...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8" role="alert">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {hasResults && (
        <section>
          <ResultsOverview 
            average={average}
            percentage={percentage}
            distinction={distinction}
          />
          <GradesTable grades={allGrades} />
        </section>
      )}
    </Layout>
  );
};

export default App;