'use client';
import { JSX, SVGProps, useState } from 'react';

type baseProps<T> = {
  type?: "single" | "multiple";
  options: T[];
  formatOption?: (value: T) => string;
  placeholder?: string;
  className?: string;
};

type single<T> = {
  type?: "single";
  selected: T;
  onSelect: (value: T) => void;
};

type multiple<T> = {
  type: "multiple";
  selected: T[];
  onSelect: (values: T[]) => void;
};

type DropdownMenuProps<T> = baseProps<T> & (single<T> | multiple<T>);

export default function DropdownMenu<T>({ type = "single", options, selected, onSelect, formatOption = (v) => String(v), placeholder = "Select options", className, }: DropdownMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: T) => {
    if (type === "single") {
      // For single selection, directly call onSelect with the selected value
      (onSelect as (value: T) => void)(value);
      setIsOpen(false); 
    } else {
      // For multiple selection, toggle the value in the selected array
      const isSelected = (selected as T[]).includes(value);
      const newSelected = isSelected
        ? (selected as T[]).filter((item) => item !== value) // Remove if already selected
        : [...(selected as T[]), value]; // Add if not selected
      (onSelect as (values: T[]) => void)(newSelected);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full z-[10] cursor-pointer flex justify-between gap-4 items-center px-4 py-3 bg-[#f6f6f6] border border-[#2A2B2A55] rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <span>
          {type === "single"
            ? selected
              ? formatOption(selected as T)
              : placeholder
            : (selected as T[]).length > 0
            ? (selected as T[]).map(formatOption).join(", ").slice(0, 30) + "..."
            : placeholder}
        </span>
        <DownArrow className={`h-4 w-4 transition-transform ${isOpen && "rotate-180"}`}/>
      </button>

      {/* Menu List */}
      <ul className={`absolute max-h-[200px] mt-2 w-full bg-[#f6f6f6] border border-[#2A2B2A55] rounded-xl shadow-md overflow-x-hidden transform transition-all duration-200 ease-out ${ isOpen ? "opacity-100 transform-y-0 z-[100]" : "opacity-0 -translate-y-10 -z-[100]" }`} >
        {options.map((option, i) => (
          <li
            key={i}
            onClick={() => handleSelect(option)}
            className={`px-4 py-3 cursor-pointer hover:bg-[#e2e4ea] border-b border-[#2A2B2A11] flex gap-3 items-center transition-all duration-250 ease-in-out`}
          >
            {type === "multiple" && (selected as T[]).includes(option) || type === "single" && selected === option ? <CheckBoxTicked className="h-6 w-6"/> : <CheckBox className="h-6 w-6"/>}
            {/* {type === "single" && selected === option ? <CheckBoxTicked className="h-6 w-6"/> : <CheckBox className="h-6 w-6"/>} */}
            <span>{formatOption(option)}</span>
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



const CheckBox = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <g id="Interface / Checkbox_Unchecked">
        <path
          id="Vector"
          d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z"
          stroke="#979797"
          strokeWidth={0.696}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

const CheckBoxTicked = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);



// Add this to your css file

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