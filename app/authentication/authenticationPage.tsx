"use client"
import Button from '@/components/button'
import Input from '@/components/input';
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
      <p className="font-bold text-xl my-4 flex justify-center tracking-wider">SIGN IN</p>

      <form action="" className="mt-10 mb-7 max-w-[500px] w-full mx-auto flex flex-col gap-7">
        <Input label="Name"  placeHolder="Name" inputName="name" inputValue={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" inputType="email" placeHolder="Email" inputName="Email" inputValue={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" inputType="password" placeHolder="Password" inputName="Password" inputValue={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="flex justify-center">
          <Button bgColor="#00c800" bgHover="#37ff37" onClick={() => loginGithub()}>Submit</Button>
        </div>
      </form>

      <div className="max-w-[500px] w-full mx-auto my-auto relative flex justify-center">
        <p className="px-2 bg-slate-200 font-bold z-[100]">OR</p>
        <hr className="absolute top-1/2 z-[10] -translate-y-1/2 w-full border-[#2A2B2A]/40"/>
      </div>

      <div className="flex gap-4 w-full justify-center mt-7">
        <Button type="outline"  outLineColor="#24292e" onClick={() => loginGithub()}>Sign In using GitHub</Button>
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