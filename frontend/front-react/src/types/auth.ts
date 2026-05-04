export interface LoginForm {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  mensaje: string;
  access_token: string;
  token_type: string;
  user: User
}

export interface User{
  id: number;
    name: string;
    email: string;
    role: "admin" | "worker";
}