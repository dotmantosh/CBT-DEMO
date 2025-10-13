export interface Question {
  id: string;
  subjectId: string;
  teacherId: string;
  text: string;
  options: string[];
  answer: string;
  createdAt: string;
}
