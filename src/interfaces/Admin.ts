export interface Admin {
  id: string;
  username: string;
  password: string;
  email?: string;
  isLoggedIn: boolean;
  role: 'admin';
}
