export interface Admin {
  id: string;
  username: string;
  password: string;
  email?: string;
  role: 'admin';
}
