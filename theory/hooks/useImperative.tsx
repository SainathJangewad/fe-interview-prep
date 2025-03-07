//  In React, forwardRef is used to pass a ref from a parent component to a child component.This is particularly useful when we want to access a child component’s DOM element or instance directly.
//  By default, refs do not get passed down to child components.forwardRef helps in explicitly forwarding the ref.

// Example :
import React, { forwardRef, useRef } from "react";

// note:
//   Defining Props Interface

//  interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> { }
//  Extends InputHTMLAttributes < HTMLInputElement > to support all standard < input > attributes(e.g., placeholder, value, onChange).
//  Eliminates the need to manually define common props.

// forwardRef<HTMLInputElement, InputFieldProps>:
// First type → HTMLInputElement: Specifies the element type ref will point to.
// Second type → InputFieldProps: Defines accepted props.
// {...props }: Spreads all input attributes onto the < input > element.


// Define props type, extending InputHTMLAttributes for standard input props
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> { }

// Child Component using forwardRef
const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
    return <input ref={ref} {...props} />;
});


// Parent Component
const Form = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        inputRef?.current?.focus();//Accessing the input field in child component
    };

    return (
        <div>
            <InputField ref={inputRef} placeholder="Type here..." />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
};

export default Form;
// -----------------------------------------------------------------------------------------------------------------------------------
//  Why Use useImperativeHandle ? 

// Right now, inputRef.current exposes the entire < input > element.
// If we only want to expose specific methods like focus(), clear(), or getValue(), we use useImperativeHandle

// Example: Exposing Custom Methods in an Input Component

// Define props type, extending InputHTMLAttributes for standard input props
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> { }

interface InputFieldMethods {
    focus: () => void;
    clear: () => void;
    getValue: () => string;
}

// Child Component using forwardRef with useImperativeHandle
const InputField = forwardRef<InputFieldMethods, InputFieldProps>((props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("");

    // Exposing only selected methods instead of the full input element
    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        clear: () => setValue(""),
        getValue: () => value,
    }));

    return <input ref={inputRef} {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
});

// Parent Component
const Form = () => {
    const inputRef = useRef<InputFieldMethods>(null);

    return (
        <div>
            <InputField ref={inputRef} placeholder="Type here..." />
            <button onClick={() => inputRef.current?.focus()}>Focus</button>
            <button onClick={() => inputRef.current?.clear()}>Clear</button>
            <button onClick={() => alert(inputRef.current?.getValue())}>Get Value</button>
        </div>
    );
};

// ----------------------------------------------------------------------------
// useImperativeHandle - Short Note
// useImperativeHandle(ref, createHandle, [deps])

// Customizes what a parent can access via ref in a child component.
// Useful for hiding internal implementation details and exposing only necessary methods.

// Syntax
useImperativeHandle(ref, () => ({
    method1: () => { /* logic */ },
    method2: () => { /* logic */ }
}), [deps]);  // 👈 Dependency array (optional)

// The dependency array(deps) determines when the returned object should be re - created.

// When to Use Dependencies([deps])
// Use[deps] when the imperative methods depend on state or props that may change.

// This ensures that the methods always have the latest values when dependencies update.
// 🔹 Example

const Child = forwardRef(({ count }, ref) => {
    useImperativeHandle(ref, () => ({
        getCount: () => count,  // Exposed method depends on `count`
    }), [count]); // Re-creates handle when `count` changes
});

// 🚫 When to Leave It Empty([])
// Use[] when the exposed methods do not depend on any changing values.

// The handle is only created once and never updates.
useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
}), []);

// ❌ When to Not Provide Dependencies at All
// Omitting[deps] means it re - creates on every render

// Not specifying[deps] is equivalent to re - creating the handle every time the component renders, which is inefficient.
// 🔹 Example

useImperativeHandle(ref, () => ({
    getValue: () => inputRef.current?.value,
}));

useImperativeHandle(ref, () => ({
    getValue: () => inputRef.current?.value,
}));




