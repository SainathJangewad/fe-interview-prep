import { FormConfig } from "./types";

export const formConfig: FormConfig = {
  id: "simpleForm",
  title: "Simple Config Form",
  fields: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "John",
      validation: { required: "First name is required" },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "john@example.com",
      validation: { required: "Email is required" },
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      validation: { required: "Role is required" },
      options: [
        { label: "Select a role", value: "" },
        { label: "Developer", value: "developer" },
        { label: "Designer", value: "designer" },
        { label: "Manager", value: "manager" },
      ],
    },
  ],
};
