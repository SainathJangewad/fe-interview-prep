import { useRef } from "react"

// deviding by ms by 1000 converts to seconds 
const getCurrTimeInSeconds = () => Date.now() / 1000;


export const useCache = (key: string, expires: number) => {
    const cache = useRef(JSON.parse(localStorage.getItem(key) || "{}"))


    const setCache = (subKey: string, data: any) => {
        const time = getCurrTimeInSeconds() + expires;
        cache.current[subKey] = { time, data };
        localStorage.setItem(subKey, JSON.stringify(cache.current));
    }

    const getCache = (subKey: string) => {
        const timeNow = getCurrTimeInSeconds();
        const cachedData = cache.current[subKey];



        if (!cachedData) return null;

        console.log('is less', timeNow < cachedData.time)

        if (timeNow < cachedData.time) {

            return cachedData.data;
        } else {
            delete cache.current[subKey];
            localStorage.setItem(subKey, cache.current);
            return null;
        }

    }
    return { setCache, getCache };
}