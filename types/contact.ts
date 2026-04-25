export type FormField = {
  value: string;
  touched: boolean;
  error: string;
};

export type FormState = {
  name: FormField;
  email: FormField;
  message: FormField;
  status: "idle" | "submitting" | "success" | "error";
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};
