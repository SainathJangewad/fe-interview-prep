import React from "react";
import { FieldConfig } from "./types";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FieldRendererProps {
    field: FieldConfig;
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

export default function FieldRenderer({ field, register, errors }: FieldRendererProps) {
    return (
        <div>
            <label htmlFor={field.name}><b>{field.label}</b></label>

            {field.type === "select" ? (
                <select id={field.name} {...register(field.name, field.validation)}>
                    {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name, field.validation)}
                />
            )}

            {errors[field.name] && (
                <div role="alert">{errors[field.name]?.message as string}</div>
            )}
        </div>
    );
}
