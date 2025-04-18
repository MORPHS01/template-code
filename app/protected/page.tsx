import { auth } from "@/hooks/useAuth";
import Image from "next/image";



async function Protected() {
  const session = await auth()


  return (
    <main>
      <h1 className="font-bold text-xl mb-8">Protected Page</h1>

      <section className="flex gap-3 w-fit rounded-xl bg-cyan-400 py-4 px-6">
        {session?.user?.image && <Image src={session?.user?.image} alt="Avatar" height={54} width={54} className="rounded-full w-[55px] h-[55px] aspect-square"/>}
        <div className="flex flex-col gap-2 justify-center">
          <p className="text-lg">{session?.user?.name}</p>
          <p className="font-light text-slate-900">{session?.user?.email}</p>
        </div>
      </section>
    </main>
  )
}

export default Protected