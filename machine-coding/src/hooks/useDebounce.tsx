import { useEffect, useState } from "react";

export function useDebounce(value: any, delay: number, cb?: () => void) {
    const [debouncedValue, setDebouncedValue] = useState();


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            if (cb) cb();
        }, delay);

        return () => clearTimeout(handler);

    }, [value, delay])

    return debouncedValue;
}
