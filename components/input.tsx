"use client"

import { useState } from "react";


type inputProps = {
  label: string;
  inputType?: string;
  placeHolder: string;
  inputName: string;
  inputValue: string;
  onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void ;
}

function Input({label, inputType="text", placeHolder, inputName, inputValue, onChange} : inputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className="relative border border-[#2A2B2A]/40 rounded-xl">
      <p className={`absolute -top-2 left-3 px-1 text-xs font-bold bg-slate-200 ${focused && "text-[#AC117D]"}`}>{label}</p>
      <input required type={inputType} placeholder={placeHolder} name={inputName} value={inputValue} onChange={onChange} className="outline-[#AC117D] font-poppins w-full h-full px-7 py-4 rounded-xl placeholder:max-sm:text-sm"/>
    </div>
  )
}

export default Input