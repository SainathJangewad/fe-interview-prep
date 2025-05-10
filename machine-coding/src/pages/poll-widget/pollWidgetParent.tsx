import React, { useEffect, useState } from "react";
import PollWidget from "./PollWidget";


interface PollData {
    pollId: string,
    title: string,
    options: { id: string, label: string, votes: number }[],
}

const PollWidgetParent: React.FC = () => {
    const [pollData, setPollData] = useState<PollData | null>(null); // Initially null to simulate loading state

    const [loading, setLoading] = useState<boolean>(true); // Explicit loading state

    const handleVote = (pollId: string, selected: string[]) => {
        console.log(`Poll ID: ${pollId}, Selected Options:`, selected);
    };

    const handleVoteRemove = () => {
        setPollData({
            pollId: "poll-1",
            title: "Favorite JavaScript Framework?",
            options: [
                { id: "react", label: "React", votes: 5 },
                { id: "angular", label: "Angular", votes: 3 },
                { id: "vue", label: "Vue", votes: 4 },
                { id: "svelte", label: "Svelte", votes: 2 },
                { id: "all", label: "All the above", votes: 0 }
            ],

        });
    }


    useEffect(() => {
        // Simulating API call with a delay
        setLoading(true);
        setTimeout(() => {
            setPollData({
                pollId: "poll-1",
                title: "Favorite JavaScript Framework?",
                options: [
                    { id: "react", label: "React", votes: 5 },
                    { id: "angular", label: "Angular", votes: 3 },
                    { id: "vue", label: "Vue", votes: 4 },
                    { id: "svelte", label: "Svelte", votes: 2 },
                    { id: "all", label: "All the above", votes: 0 }
                ],

            });
            setLoading(false);
        }, 1000); // Simulating network delay of 1 second
    }, []);

    if (loading) {
        return <p>Loading poll data...</p>; // Show a loading state while fetching
    }

    return (
        <div>
            <PollWidget
                pollId={pollData.pollId}
                title={pollData.title}
                options={pollData.options}
                multiple={!true}
                onVote={handleVote}
                onVoteRemove={handleVoteRemove}
                styles={{
                    title: { color: "blue" },
                    optionContainer: { backgroundColor: "#f5f5f5", padding: "10px" },
                    progressBar: { backgroundColor: "green", height: "10px" },
                }}
            />
        </div>
    );
};

export default PollWidgetPare
nt;
