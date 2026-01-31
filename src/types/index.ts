export interface Grade {
  subject: string;
  grade: number;
  weight: number;
  year: string;
}

export interface DistinctionLevel {
  label: string;
  color: string;
}

export type FileUploadType = 'past' | 'this';
