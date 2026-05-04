import type { User } from "./user";

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
  user: User;
}