export interface Question {
  id: number;
  subjectId?: number;
  teacherId?: number;
  text: string;
  options: string[];
  answer: string;
  createdBy?: string;
  createdAt?: string;
}
