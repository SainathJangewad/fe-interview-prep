import { useRef } from "react"

export const useEffectPoly = (fn: any, deps?: any[]) => {
    const depsRef: any = useRef([])
    let cleanUpFnRef: any = useRef(null);
    let callOnceRef: any = useRef(false);

    const prevDeps = depsRef?.current;

    // If no dependencies are provided, run the function on every render
    if (!deps) {
        if (cleanUpFnRef.current) cleanUpFnRef.current();
        cleanUpFnRef.current = fn();
        return;
    }

    // If the dependency array is empty and we haven't called the function before, call it once
    if (deps.length == 0 && !callOnceRef.current) {
        fn();
        callOnceRef.current = true;
        return;
    }

    let depsChanged = false;

    // Compare the current dependencies with the previous ones
    for (let i = 0; i < prevDeps.length; i++) {
        if (prevDeps[i] != deps[i]) {
            depsChanged = true;
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
