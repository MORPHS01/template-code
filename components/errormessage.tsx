import React from "react";

type ErrorProps = React.HTMLAttributes<HTMLParagraphElement> & {
  label: string;
};

function ErrorMessage({ label, ...rest }: ErrorProps) {
  return (
    <p className="text-red-500 shake" {...rest}>
      {label}
    </p>
  );
}

export default ErrorMessage;

// Put in globals.css file

// @keyframes shake {
//   0% { transform: translateX(0); }
//   25% { transform: translateX(-5px); }
//   50% { transform: translateX(5px); }
//   75% { transform: translateX(-5px); }
//   100% { transform: translateX(0); }
// }

// .shake {
//   animation: shake 0.3s ease-in-out;
// }