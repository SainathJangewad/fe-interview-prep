import { useRef } from "react"

export const useEffectPoly = (fn: any, deps?: any[]) => {
    // Using useRef to persist state across renders without causing re-renders
    const depsRef: any = useRef([])  // Ref to store previous dependency values
    let cleanUpFnRef: any = useRef(null);  // Ref to store the cleanup function from previous effect
    let callOnceRef: any = useRef(false);  // Ref to ensure the function runs only once if deps is empty

    const prevDeps = depsRef?.current;  // Get the previous dependency array from the ref

    // If no dependencies are provided, run the function on every render
    if (!deps) {
        fn();  // Call the effect function immediately
        return;
    }

    // If the dependency array is empty and we haven't called the function before, call it once
    if (deps.length == 0 && !callOnceRef.current) {
        fn();  // Call the effect function once
        callOnceRef.current = true;  // Set the flag so it doesn't call the function again
        return;
    }

    let depsChanged = false;  // Flag to track if dependencies have changed

    // Compare the current dependencies with the previous ones
    for (let i = 0; i < prevDeps.length; i++) {
        if (prevDeps[i] != deps[i]) {
            depsChanged = true;  // If any dependency has changed, set the flag to true
            break;
        }
    }

    // If the dependencies have changed, or if the lengths of the dependencies are different
    if (depsChanged || prevDeps.length != deps.length) {
        // If there was a cleanup function from the previous render, call it
        if (cleanUpFnRef.current) cleanUpFnRef.current();

        // Store the new cleanup function by calling the effect function
        cleanUpFnRef.current = fn();
    }

    // Update the previous dependencies with the current ones for the next render
    depsRef.current = deps;
}

// Explanation:
// - When deps are not provided, the function will run on every render.
// - When deps change, the function will be called again.
// - If deps is an empty array [], the function will be called once and not again on future renders.
// - The cleanup function (if returned by fn) will be called when deps change.
// - The deps array is optional. If not provided, the effect runs on every render.
