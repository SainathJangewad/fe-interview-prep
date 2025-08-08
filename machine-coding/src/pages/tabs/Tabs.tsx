import React, { useState, ReactNode } from "react";
import "./Tabs.scss";

export interface TabItem {
    label: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    defaultActiveIndex?: number;
    onTabChange?: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveIndex = 0, onTabChange }) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

    const handleTabClick = (index: number) => {
        setActiveIndex(index);
        onTabChange?.(index);
    };

    return (
        <div className="tabs">
            <div className="tabs__header">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tabs__tab ${index === activeIndex ? "active" : ""}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tabs__content">
                {tabs[activeIndex]?.content}
            </div>
        </div>
    );
};

export default Tabs;
