"use client";

import { useState } from "react";

type baseProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

type filledButton = {
  type?: "fill";
  bgColor: string;
  bgHover: string;
  textColor?: string;
};

type outlinedButton = {
  type: "outline";
  outLineColor: string;
};

type buttonProps = baseProps & (filledButton | outlinedButton);

function Button(props: buttonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const { children, type = "fill", disabled, onClick, } = props;

  // Conditional destructuring based on type
  const isFill = type === "fill";
  const bgColor = isFill ? (props as filledButton).bgColor : undefined;
  const bgHover = isFill ? (props as filledButton).bgHover : undefined;
  const textColor = isFill ? (props as filledButton).textColor || "white" : undefined;
  const outLineColor = !isFill ? (props as outlinedButton).outLineColor : undefined;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={
        type === "fill"
          ? { backgroundColor: isHovered ? bgHover : bgColor, color: textColor }
          : { backgroundColor: "transparent", borderWidth: 2, borderColor: outLineColor, color: outLineColor }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`px-6 py-3 max-w-fit cursor-pointer rounded-lg disabled:opacity-50 hover:scale-110 disabled:hover:scale-100 transition-all duration-200 ease-in-out`}
    >
      {children}
    </button>
  );
}

export default Button;