export interface Teacher {
  id: string;
  subjectId: string;
  subject?: string;
  title: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
  email?: string;
}
