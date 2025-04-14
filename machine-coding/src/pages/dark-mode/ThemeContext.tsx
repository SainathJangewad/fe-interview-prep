import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ThemeType = "dark" | "light";


interface ContextType {
    theme: ThemeType,
    toggleTheme: () => void,
}


// Create context 
const ThemeContext = createContext<ContextType | undefined>(undefined);

// provider 
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>(() => {
        const themeValue = localStorage.getItem("theme") as ThemeType | null;
        if (themeValue) return themeValue;

        //This line is checking the user's system-level theme preference (like macOS, Windows, or browser theme) using the matchMedia API.
        //window.matchMedia(...) → This checks if the browser matches a given media query.
        //"(prefers-color-scheme: dark)" → This media query returns true if the user prefers dark mode.
        //.matches → Boolean: true if the query matches, false if not.
        //? "dark" : "light" → Ternary operator:
        //If true, set theme to "dark"
        //Otherwise, set it to "light"


        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    const toggleTheme = () => {
        setTheme((prev: ThemeType) => prev == 'dark' ? 'light' : 'dark');
    }

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem('theme', theme);
    }, [theme])

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useThem must be used within a ThemeProvider")

    return context;
}
