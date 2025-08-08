import React from "react";
import Tabs, { TabItem } from "./Tabs";

const TabsParent: React.FC = () => {
    const tabData: TabItem[] = [
        { label: "Home", content: <div>Welcome to Home tab</div> },
        { label: "Profile", content: <div>Profile details go here</div> },
        { label: "Settings", content: <div>Adjust your preferences here</div> },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h2>Reusable Tabs Component</h2>
            <Tabs
                tabs={tabData}
                defaultActiveIndex={0}
                onTabChange={(index) => console.log("Active Tab:", index)}
            />
        </div>
    );
};

export default TabsParent;
