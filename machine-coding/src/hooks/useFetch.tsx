
import { useEffect, useState } from "react";

const useFetch = (url: string, options?: any) => {
    const [data, setData] = useState<null | any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);

    const fetchData = async (url: string, signal?: AbortSignal) => {
        setLoading(true);
        try {
            let res = await fetch(url, { ...(options || { method: "GET" }), signal });
            if (!res.ok) {
                throw new Error('Network error');
            }
            let result = await res.json();
            setData(result);
            setError(null);
        } catch (error: any) {
            if (error.name !== "AbortError") {
                setError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (url) {
            fetchData(url, signal);
        }

        return () => controller.abort(); // Cleanup
    }, [url, options]);

    return { data, loading, error };
};

export default useFetch;
