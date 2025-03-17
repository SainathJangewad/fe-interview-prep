import { useEffect, useRef } from "react"


const areEqual = (oldDeps: any[], newDeps: any[]) => {
    if (!oldDeps) return false; // if no deps provided then run on every render
    if (oldDeps.length !== newDeps.length) return false;

    for (let i = 0; i < oldDeps.length; i++) {
        if (oldDeps[i] !== newDeps[i]) return false;
    }

    return true;
}


export const useMemoPoly = (cb: () => any, deps: any[]) => {
    const cache = useRef<{ value: any, deps: any[] } | null>(null)
    //!cache?.current is to trigger initial trigger
    if (!cache?.current || !areEqual(cache.current.deps, deps)) {
        cache.current = { value: cb(), deps: deps };
    }

    // clean up 
    useEffect(() => {
        return () => {
            cache.current = null;
        }
    }, [])

    return cache.current.value;
}