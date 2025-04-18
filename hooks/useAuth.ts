import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const user = { id: "1", name: "mofe", email: "ayonimofe2202@gmail.com", password: "Ayonimofe.22" }

export const {auth, handlers, signIn, signOut} = NextAuth({
  providers: [
    GitHub, 
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        // name: { label: "Name", type: "text", placeholder: "Name" },
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        // const user = { id: "1", name: "mofe", email: "ayonimofe2202@gmail.com", password: "Ayonimofe.22" }
  
        if (credentials?.email === user.email && credentials?.password === user.password) {
          return user
        } else {
          return null
        }
      }
    })

  ],
  // pages: {
  //   signIn: "/authentication", // Custom sign-in page
  // },
})

