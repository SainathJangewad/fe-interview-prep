export type FieldType = "text" | "email" | "select";

export interface Option {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  validation?: any;
  options?: Option[]; // For select fields
}

export interface FormConfig {
  id: string;
  title?: string;
  fields: FieldConfig[];
}
