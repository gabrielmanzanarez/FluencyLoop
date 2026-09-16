export interface User {
  id?: number;
  name: string;
  email: string;
  token?: string; // Optional token if using JWT
}

export interface Language {
  id?: number;
  name: string;
  code: string;
  icon_url: string;
  created_at?: Date;
}
