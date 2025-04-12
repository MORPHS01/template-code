/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface PaystackPaymentOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  metadata?: any;
  onSuccess?: (response: any) => void;
  onCancel?: () => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup(options: PaystackPaymentOptions & { callback: any; onClose: any }): {
        openIframe(): void;
      };
    };
  }
}

// Custom Hook
function usePaystackPayment() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const scriptSrc = "https://js.paystack.co/v1/inline.js";

    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
      setIsReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.onload = () => setIsReady(true);
    script.onerror = () => toast.error("Failed to load Paystack script.");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const pay = ({ key, email, amount, currency = "NGN", ref = `ref-${Date.now()}`, metadata, onSuccess, onCancel, }: PaystackPaymentOptions) => {
    if (!window.PaystackPop || typeof window.PaystackPop.setup !== "function") {
      alert("Paystack is not ready yet.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key,
      email,
      amount,
      currency,
      ref,
      metadata,
      callback: onSuccess,
      onClose: onCancel,
    });

    handler.openIframe();
  };

  return { isReady, pay };
}

// Component
export default function PayWithPaystack({ email, amount, disabled, }: { email: string; amount: number; disabled: boolean; }) {
  const { isReady, pay } = usePaystackPayment();

  const handlePayment = () => {
    pay({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!, // Public key from .env
      email,
      amount: amount * 100, // Convert to kobo (e.g., 5000 NGN = 500000 kobo)
      metadata: { custom_fields: [{ display_name: "Email", value: email }] },
      onSuccess: (response) => {
        toast.success(`Payment successful! Ref: ${response.reference}. A receipt will be sent to your email address immediately.`);
      },
      onCancel: () => {
        toast.error("Payment processing has been canceled.")
      },
    });
  };

  return (
    <button onClick={handlePayment} disabled={!isReady || !disabled} className="px-6 py-3 max-w-fit cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:hover:bg-green-600 disabled:opacity-50 hover:scale-110 disabled:hover:scale-100 transition-all duration-200 ease-in-out" >
      {isReady ? `Pay ₦${amount}` : "Loading..."}
    </button>
  );
}
