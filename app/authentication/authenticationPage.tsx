"use client"
import Button, { Spinner } from '@/components/button'
import Input from '@/components/input';
import { loginGithub, loginGoogle, logout, loginCredentials } from '@/lib/actions'
import { redirect } from 'next/navigation'
import { useState, useTransition } from 'react';
import { useLocalStorage } from '@/hooks/textHooks';
import { loginSchema } from '@/schema/zodschema';
import { user } from '@/hooks/useAuth';
import ErrorMessage from '@/components/errormessage';



export function SignInPage(){
  const [email, setEmail] = useLocalStorage("formEmail", "");
  const [password, setPassword] = useLocalStorage("formPassword", "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadState, setLoadState] = useState(false);
  const [isPending1, startTransition1] = useTransition()
  const [isPending2, startTransition2] = useTransition()
  const [animationKey, setAnimationKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = loginSchema.safeParse({ email, password })

    if (!isValid.success) {
      // Map errors to a key-value object
      const fieldErrors: { [key: string]: string } = {};
      isValid.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      setAnimationKey((prevKey) => prevKey + 1)
    } else {
      setErrors({});
      if (email === user.email && password === user.password) {
        setLoadState(true)
        await loginCredentials(email, password);
        setLoadState(false)
      } else {
        setErrors({inCorrect: "Incorrect Email or Password"});
        setAnimationKey((prevKey) => prevKey + 1)
      }
    }
  }

  return(
    <main>
      <Button bgColor="#ac38ae" bgHover="#d278d4" onClick={() => redirect("/")}>Back to home</Button>
      <p className="font-bold text-xl my-4 flex justify-center tracking-wider">SIGN IN</p>

      <form onSubmit={handleSubmit} className="mt-10 mb-7 max-w-[500px] w-full mx-auto flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <Input label="Email" type="email" placeholder="Email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && (<ErrorMessage key={animationKey} label={errors.email}/> )}
        </div>

        <div className="flex flex-col gap-2">
          <Input label="Password" type="password" placeholder="Password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && (<ErrorMessage key={animationKey} label={errors.password}/>)}
        </div>

        {errors.inCorrect && <ErrorMessage key={animationKey} label={errors.inCorrect}/>}

        <div className="flex justify-center">
          <Button bgColor="#00c800" bgHover="#37ff37" formType="submit" loading={loadState}>Submit</Button>
          {/* disabled={ !name || !email || !password } */}
        </div>
      </form>

      <div className="max-w-[500px] w-full mx-auto my-auto relative flex justify-center">
        <p className="px-2 bg-slate-200 font-bold z-[100]">OR</p>
        <hr className="absolute top-1/2 z-[10] -translate-y-1/2 w-full border-[#2A2B2A]/40"/>
      </div>

      <div className="flex flex-col gap-4 max-w-[500px] w-full mx-auto justify-center mt-7">
        <Button type="outline" className="w-full"  outLineColor="#24292e" onClick={() => startTransition1(() => loginGithub())} loading={isPending1} spinnerColor="black">Sign In using GitHub</Button>
        <Button type="outline" className="w-full" outLineColor="#eb493b" onClick={() => startTransition2(() => loginGoogle())} loading={isPending2} spinnerColor="gray">Sign In using Google</Button>
      </div>
      <Spinner spinnerColor='gray'/>
    </main>
  )
}

export function SignOutPage(){
  const [isPending, startTransition] = useTransition()

  return(
    <main>
      <Button bgColor="#ac38ae" bgHover="#d278d4" onClick={() => redirect("/")}>Back to home</Button>
      <p className="font-bold text-xl my-4">Sign Out</p>
      <div className="flex gap-4">
        <Button bgColor="#e60000" bgHover="#ff4d4d" onClick={() => startTransition(() => logout())} loading={isPending} spinnerColor="white">Sign Out</Button>
      </div>
    </main>
  )
}


