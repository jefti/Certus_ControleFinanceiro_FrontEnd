import { createContext, useState, type ReactNode } from "react";
import {
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
} from "../storage/authStorage";
import type {
  AuthContextData,
  AuthSession,
  AuthUser,
  SignInPayload,
} from "../types/auth";
import { signInRequest } from "../services/authService";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function normalizeToken(token: string) {
  return token.replace(/^Bearer\s+/i, "");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [initialSession] = useState<AuthSession | null>(() => loadAuthSession());
  const [user, setUser] = useState<AuthUser | null>(initialSession?.user ?? null);
  const [token, setToken] = useState<string | null>(initialSession?.token ?? null);

  async function signIn(data: SignInPayload) {
    const response = await signInRequest(data);

    const session: AuthSession = {
      token: normalizeToken(response.token),
      user: response.usuario,
    };

    saveAuthSession(session);
    setUser(session.user);
    setToken(session.token);
  }

  function signOut() {
    clearAuthSession();
    setUser(null);
    setToken(null);
  }

  const value: AuthContextData = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    signIn,
    signOut,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
