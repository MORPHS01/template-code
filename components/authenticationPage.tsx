"use client"
import Button from '@/components/button'
import { loginGithub, loginGoogle, logout } from '@/lib/actions'
import { redirect } from 'next/navigation'
import { useState } from 'react';



// function AuthenticationPage() {
//   return (
//     <main>
//     <Button bgColor="#ac38ae" bgHover="#d278d4" onClick={() => redirect("/")}>Back to home</Button>
//     <p className="font-bold text-xl my-4">Sign In</p>
//     <div className="flex gap-4">
//       <Button bgColor="#24292e" bgHover="#2b3137" onClick={() => loginGithub()}>Sign In using GitHub</Button>
//       <Button bgColor="#eb493b" bgHover="#ee695d" onClick={() => loginGoogle()}>Sign In using Google</Button>
//     </div>
//     <p className="font-bold text-xl my-4">Sign Out</p>
//     <div className="flex gap-4">
//       <Button bgColor="#e60000" bgHover="#ff4d4d" onClick={() => logout()}>Sign Out</Button>
//     </div>
//   </main>
//   )
// }

// export default AuthenticationPage

export function SignInPage(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return(
    <main>
      <Button bgColor="#ac38ae" bgHover="#d278d4" onClick={() => redirect("/")}>Back to home</Button>
      <p className="font-bold text-xl my-4">Sign In</p>

      <form action="" className="mt-10 mb-5 max-w-[500px] w-full mx-auto flex flex-col gap-7">
        <div className="relative border border-[#2A2B2A]/40 rounded-xl">
          <p className="absolute -top-2 left-3 px-1 text-xs font-bold bg-slate-200">Name</p>
          <input required type="text" placeholder="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} className="outline-[#AC117D] font-poppins w-full h-full px-7 py-4 rounded-xl placeholder:max-sm:text-sm"/>
        </div>

        <div className="relative border border-[#2A2B2A]/40 rounded-xl">
          <p className="absolute -top-2 left-3 px-1 text-xs font-bold bg-slate-200">Email</p>
          <input required type="text" placeholder="Email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="outline-[#AC117D] font-poppins w-full h-full px-7 py-4 rounded-xl placeholder:max-sm:text-sm"/>
        </div>

        <div className="relative border border-[#2A2B2A]/40 rounded-xl">
          <p className="absolute -top-2 left-3 px-1 text-xs font-bold bg-slate-200">Password</p>
          <input required type="password" placeholder="Password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="outline-[#AC117D] font-poppins w-full h-full px-7 py-4 rounded-xl placeholder:max-sm:text-sm"/>
        </div>

        <div className="flex justify-center">
          <Button bgColor="#00c800" bgHover="#37ff37" onClick={() => loginGithub()}>Submit</Button>
        </div>
      </form>

      <div className="flex gap-4 w-full justify-center">
        <Button bgColor="#24292e" bgHover="#2b3137" onClick={() => loginGithub()}>Sign In using GitHub</Button>
        <Button type="outline" outLineColor="#eb493b" onClick={() => loginGoogle()}>Sign In using Google</Button>
      </div>
    </main>
  )
}

export function SignOutPage(){
  return(
    <main>
      <Button bgColor="#ac38ae" bgHover="#d278d4" onClick={() => redirect("/")}>Back to home</Button>
      <p className="font-bold text-xl my-4">Sign Out</p>
      <div className="flex gap-4">
        <Button bgColor="#e60000" bgHover="#ff4d4d" onClick={() => logout()}>Sign Out</Button>
      </div>
    </main>
  )
}