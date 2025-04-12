"use client"

import { useState } from "react";

type baseProps = {
  children: React.ReactNode;
  // type?: "fill" | "outline";
  disabled?: boolean;
  onClick: () => void;
}

type filledButton = {
  type?: "fill"
  bgColor: string; 
  bgHover: string;
  textColor?: string;
}

type outlinedButton = {
  type: "outline"
  outLineColor: string;
}

type buttonProps = baseProps & (filledButton | outlinedButton);

function Button({children, type="fill", outLineColor, bgColor, bgHover, textColor="white", disabled, onClick } : buttonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      style={ type === "fill" ? { backgroundColor: isHovered ? bgHover : bgColor , color:textColor } : { backgroundColor: "transparent", borderWidth: 2, borderColor: outLineColor, color: outLineColor }} 
      onMouseEnter={() => setIsHovered(true)}  
      onMouseLeave={() => setIsHovered(false)} 
      className={`px-6 py-3 max-w-fit cursor-pointer rounded-lg disabled:opacity-50 hover:scale-110 disabled:hover:scale-100 transition-all duration-200 ease-in-out`}
    >
      {children}
    </button>
  )
}

export default Button