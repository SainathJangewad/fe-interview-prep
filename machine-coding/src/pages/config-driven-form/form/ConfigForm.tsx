import React from "react";
import { useForm } from "react-hook-form";
import { FormConfig } from "./types";
import FieldRenderer from "./FieldRenderer";

interface ConfigFormProps {
    config: FormConfig;
    onSubmit?: (values: any) => void;
}

export default function ConfigForm({ config, onSubmit }: ConfigFormProps) {
    const defaultValues = Object.fromEntries(config.fields.map(f => [f.name, ""]));
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

    const submit = (values: any) => {
        console.log("Submitted:", values);
        onSubmit?.(values);
    };

    return (
        <form onSubmit={handleSubmit(submit)} noValidate>
            {config.title && <h1>{config.title}</h1>}

            {config.fields.map((field) => (
                <FieldRenderer
                    key={field.name}
                    field={field}
                    register={register}
                    errors={errors}
                />
            ))}

            <button type="submit">Submit</button>
        </form>
    );
}
