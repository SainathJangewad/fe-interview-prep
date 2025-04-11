import React, { useMemo } from "react";
import "./ProgressBar.scss";

interface ProgressBarProps {
    value: number; // Current progress
    max?: number; // Maximum value (default: 100)
    color?: "primary" | "success" | "warning" | "danger"; // Color themes
    size?: "small" | "medium" | "large"; // Progress bar sizes
    striped?: boolean; // Striped effect
    animated?: boolean; // Animated stripes
    showLabel?: boolean; // Show percentage text
    className?: string; // Additional class names
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max = 100,
    color = "primary",
    size = "medium",
    striped = false,
    animated = false,
    showLabel = true,
    className = "",
}) => {
    const percentage = useMemo(() => Math.min(100, (value / max) * 100), [value, max]);

    return (
        <div
            className={`progress-container ${size} ${className}`}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label="Progress"
        >

            <div
                className={`progress-bar ${color} ${striped ? "striped" : ""} ${animated ? "animated" : ""}`}
                style={{ transform: `translateX(-${100 - percentage}%)` }}

            >
                {showLabel && <span>{Math.round(percentage)}%</span>}
            </div>
        </div>
    );
};

export default ProgressBar;
