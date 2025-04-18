"use server";
import { signIn, signOut } from '@/hooks/useAuth'



export const loginGithub = async () => {
  await signIn("github", { redirectTo: "/" })
}

export const loginGoogle = async () => {
  await signIn("google", { redirectTo: "/" })
}

export const loginCredentials = async (email: string, password: string) => {
  await signIn("credentials", { redirectTo: "/", email, password })
}

export const logout = async () => {
  await signOut({ redirectTo: "/" })
}



