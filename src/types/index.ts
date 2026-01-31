export interface Grade {
  subject: string;
  grade: number;
  credits: number;
  year: string;
}

export interface DistinctionLevel {
  label: string;
  color: string;
}

export type FileUploadType = 'past' | 'this';
