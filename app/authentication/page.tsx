"use server"
import { SignInPage, SignOutPage } from '@/components/authenticationPage';
import { auth } from '@/hooks/useAuth'



async function  Authentication() {
  const session = await auth();
  console.log(session)

  return (
    <main>
      <p className="font-bold text-lg mb-5">{session?.user?.name || "No user"}</p>

      {session ? <SignOutPage/> : <SignInPage/>}

    </main>
  )
}

export default Authentication
