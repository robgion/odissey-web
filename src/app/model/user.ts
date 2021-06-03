export interface User {
  id?: string;
  name?: string;
  address?: string;
  role?: string;
  email?: string;
}

export interface SessionData {
  username: string;
  password: string;
  token: string;
  role: string;
}

