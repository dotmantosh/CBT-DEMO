export interface Teacher {
  id: number;
  subjectId?: number;
  subject?: string;
  title: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
  email?: string;
  isLoggedIn?: boolean;
  role?: 'teacher';
  createdAt?: string;
}
