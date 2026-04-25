"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducer } from "react";
import type { ContactPayload, FormState } from "@/types/contact";

type FieldName = "name" | "email" | "message";

type Action =
  | { type: "SET_FIELD"; field: FieldName; value: string }
  | { type: "SET_TOUCHED"; field: FieldName; touched: boolean }
  | { type: "SET_ERROR"; field: FieldName; error: string }
  | { type: "SET_STATUS"; status: FormState["status"] }
  | { type: "RESET" };

const initialState: FormState = {
  name: { value: "", touched: false, error: "" },
  email: { value: "", touched: false, error: "" },
  message: { value: "", touched: false, error: "" },
  status: "idle",
};

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          value: action.value,
        },
      };
    case "SET_TOUCHED":
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          touched: action.touched,
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          error: action.error,
        },
      };
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function validateField(field: FieldName, value: string): string {
  const trimmed = value.trim();

  if (field === "name") {
    if (!trimmed) return "Name is required.";
    if (trimmed.length < 2) return "Name must be at least 2 characters.";
  }

  if (field === "email") {
    if (!trimmed) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address.";
  }

  if (field === "message") {
    if (!trimmed) return "Message is required.";
    if (trimmed.length < 10) return "Message must be at least 10 characters.";
  }

  return "";
}

export default function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validateAll = (): boolean => {
    const fields: FieldName[] = ["name", "email", "message"];
    let hasError = false;

    fields.forEach((field) => {
      dispatch({ type: "SET_TOUCHED", field, touched: true });
      const error = validateField(field, state[field].value);
      dispatch({ type: "SET_ERROR", field, error });
      if (error) hasError = true;
    });

    return !hasError;
  };

  const handleBlur = (field: FieldName) => {
    dispatch({ type: "SET_TOUCHED", field, touched: true });
    dispatch({
      type: "SET_ERROR",
      field,
      error: validateField(field, state[field].value),
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!validateAll()) return;

    dispatch({ type: "SET_STATUS", status: "submitting" });

    const payload: ContactPayload = {
      name: state.name.value.trim(),
      email: state.email.value.trim(),
      message: state.message.value.trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      dispatch({ type: "SET_STATUS", status: "success" });
    } catch {
      dispatch({ type: "SET_STATUS", status: "error" });
    }
  };

  const buttonBaseClass =
    "mt-4 flex h-[52px] w-full items-center justify-center transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field
        id="contact-name"
        label="NAME"
        value={state.name.value}
        error={state.name.touched ? state.name.error : ""}
        onChange={(value) => dispatch({ type: "SET_FIELD", field: "name", value })}
        onBlur={() => handleBlur("name")}
      />

      <Field
        id="contact-email"
        label="EMAIL"
        type="email"
        value={state.email.value}
        error={state.email.touched ? state.email.error : ""}
        onChange={(value) => dispatch({ type: "SET_FIELD", field: "email", value })}
        onBlur={() => handleBlur("email")}
      />

      <Field
        id="contact-message"
        label="MESSAGE"
        as="textarea"
        value={state.message.value}
        error={state.message.touched ? state.message.error : ""}
        onChange={(value) => dispatch({ type: "SET_FIELD", field: "message", value })}
        onBlur={() => handleBlur("message")}
      />

      {state.status === "idle" && (
        <button type="submit" className={`${buttonBaseClass} bg-accent font-display text-[20px] text-black hover:bg-white`}>
          SEND MESSAGE
        </button>
      )}

      {state.status === "submitting" && (
        <button type="button" className={`${buttonBaseClass} bg-accent/70`} disabled>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="h-[6px] w-[6px] rounded-full bg-black dot-pulse"
                  style={{ animationDelay: `${index * 0.15}s` }}
                />
              ))}
            </div>
            <span className="font-display text-[20px] text-black">SENDING...</span>
          </div>
        </button>
      )}

      {state.status === "success" && (
        <button
          type="button"
          className={`${buttonBaseClass} gap-2 border border-accent bg-transparent font-display text-[20px] text-accent`}
          onClick={() => dispatch({ type: "RESET" })}
        >
          MESSAGE SENT
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12.5L10 17L19 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="check-draw"
            />
          </svg>
        </button>
      )}

      {state.status === "error" && (
        <button
          type="submit"
          className={`${buttonBaseClass} animate-shake bg-accent font-display text-[20px] text-black`}
        >
          TRY AGAIN
        </button>
      )}

      <style jsx>{`
        .dot-pulse {
          animation: dotPulse 0.9s ease-in-out infinite;
        }

        .check-draw {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: checkDraw 0.6s ease forwards;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes checkDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-6px);
          }
          40% {
            transform: translateX(6px);
          }
          60% {
            transform: translateX(-4px);
          }
          80% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  as = "input",
}: {
  id: string;
  label: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: "text" | "email";
  as?: "input" | "textarea";
}) {
  const sharedClassName =
    "peer w-full bg-transparent font-body text-[16px] text-[#F5F5F5] outline-none placeholder:text-transparent";

  return (
    <div className="group mb-8 border-b border-[#2A2A2A] pb-2">
      <div className="field-wrapper">
        {as === "textarea" ? (
          <textarea
            id={id}
            rows={5}
            placeholder=" "
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            className={`${sharedClassName} resize-none pt-2`}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder=" "
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            className={`${sharedClassName} h-9`}
          />
        )}

        <label
          htmlFor={id}
          className="pointer-events-none absolute bottom-2 left-0 origin-left font-body text-[14px] text-[#555555] transition-all duration-200 peer-focus:-translate-y-7 peer-focus:scale-[0.8] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-[0.8] peer-[:not(:placeholder-shown)]:text-accent"
        >
          {label}
        </label>
      </div>

      <span className="block h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-focus-within:scale-x-100" />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-1 overflow-hidden font-body text-[11px] text-accent"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
