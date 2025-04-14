import React from "react";
import "./ThemeToggle.scss";
import { useTheme } from "./ThemeContext";

const ThemeToggle: React.FC = () => {
    const themeContext = useTheme();

    if (!themeContext) return null;

    const { theme, toggleTheme } = themeContext;

    return (
        <button
            className={`theme-toggle ${theme === "dark" ? "dark" : "light"}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <div className="slider" />
        </button>
    );
};

export default ThemeToggle;
