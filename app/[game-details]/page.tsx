"use client"
import Input from "@/components/input"
import PayWithPaystack from "@/hooks/paystackHook"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { ToastContainer } from "react-toastify"


function Game() {
  const searchParams = useSearchParams()
  const name = searchParams.get("gameName")
  const description = searchParams.get("gameDescription")
  const price = searchParams.get("gamePrice")
  const rating = searchParams.get("gameRating")

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  return (
    <div className="flex flex-col gap-3">
      {/* Toast container should be placed in root page of application */}
      <ToastContainer
        toastClassName="z-[9999]"
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        closeButton={true} 
        aria-label={undefined}
      />
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{price}</p>
      <p>{rating}</p>

      <Link href="/" className="bg-slate-400 max-w-[120px] max-h-[100px] py-3 px-5 rounded-lg hover:bg-slate-800 text-slate-800 hover:text-slate-400 hover:scale-110 transition-all duration-200 ease-in-out">Go Home</Link>

      {/* Paystack implementation */}
      <div className="flex flex-col gap-7 p-6 w-[50%]">
        <h2 className="text-xl font-semibold mb-4">Pay with Paystack</h2>
        <Input label="Name" required type="text" placeholder="Please Enter Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
        <Input label="Email" required type="email" placeholder="Please Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <PayWithPaystack email={email} amount={parseInt(price ?? '0')} disabled={ emailRegex.test(email) && displayName.length > 2 } />
      </div>
    </div>
  )
}

export default Game