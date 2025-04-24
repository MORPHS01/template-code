'use client';
import { JSX, SVGProps, useState } from 'react';

type DropdownMenuProps<T> = {
  options: T[];
  selected: T | null;
  onSelect: (value: T) => void;
  formatOption?: (value: T) => string;
  placeholder?: string;
  className?: string;
};

export default function DropdownMenu<T>({ options, selected, onSelect, formatOption = (v) => String(v), placeholder = 'Select an option', className }: DropdownMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-fit ${className}`}>
      <button onClick={() => setIsOpen((prev) => !prev)} className="w-full z-[10] cursor-pointer flex justify-between gap-4 items-center px-4 py-3 bg-[#f6f6f6] border border-[#2A2B2A55] rounded-xl shadow-sm hover:shadow-md transition-all duration-200" >
        <span>{selected ? formatOption(selected) : placeholder}</span>
        <DownArrow className={`h-4 w-4 transition-transform ${isOpen && "rotate-180"}`} />
      </button>

      {/* Menu List */}
      <ul className={`absolute  max-h-[200px] mt-2 w-full bg-[#f6f6f6] border border-[#2A2B2A55] rounded-xl shadow-md overflow-x-hidden transform transition-all duration-200 ease-out ${isOpen ? "opacity-100 transform-y-0 z-[100]" : "opacity-0 -translate-y-10 -z-[100]"}`}>
        {options.map((option, i) => (
          <li key={i} onClick={() => handleSelect(option)} className={`px-4 py-3 cursor-pointer hover:bg-[#e2e4ea] flex justify-between items-center transition-all duration-250 ease-in-out ${selected === option && "bg-[#e2e4ea] font-medium"}`} >
            <span>{formatOption(option)}</span>
            {selected === option && <Check className="h-6 w-6" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

const DownArrow = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="800px"
    height="800px"
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <polyline
        fill="none"
        stroke="#000000"
        strokeWidth={4}
        strokeLinejoin="bevel"
        strokeMiterlimit={10}
        points="15,24 32,41  49,24  "
      />
    </g>
  </svg>
);

const Check = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    fill="#00c951"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z" />
  </svg>
);

// Put in globals.css file

// @keyframes fadeIn {
//   from {
//     opacity: 0;
//     transform: translateY(-10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// .fade-in {
//   animation: fadeIn 0.3s ease-out;
// }

// ::-webkit-scrollbar {
//   width: 10px;
//   background-color: transparent;
// }

// ::-webkit-scrollbar-thumb {
//   background-color: #6d7992;
//   width: 10px;
//   border: 2px solid #ebe9fe;
//   border-radius: 10px;
// }