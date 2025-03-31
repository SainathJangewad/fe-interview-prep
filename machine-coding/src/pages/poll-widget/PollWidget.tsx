import React, { useEffect, useState } from "react";
import "./PollWidget.scss";

/*
Changing width (Not Recommended)
When you update width, the browser triggers layout recalculations:

Recalculate Layout (Reflow) – The browser has to recalculate positions of all elements affected by the width change.

Repaint – The browser redraws pixels on the screen.

Composite – The browser assembles everything together and renders it.

This is slow, especially when animations happen frequently.

✅ Using scaleX (Better Performance)
When using transform: scaleX(), the browser only triggers compositing:

No Layout Recalculation – The element’s size stays the same in the document flow.

No Repaint – The browser doesn’t have to redraw pixels; it just stretches the existing pixels.

Only Composite – The GPU (Graphics Processing Unit) handles the scaling efficiently.

This means smoother animations, less CPU work, and better performance!




*/

interface PollOption {
    id: string;
    label: string;
    votes: number;
}

interface CustomStyles {
    title?: React.CSSProperties;
    optionContainer?: React.CSSProperties;
    progressBar?: React.CSSProperties;
}

interface PollWidgetProps {
    pollId: string;
    title: string;
    options: PollOption[];
    multiple?: boolean;
    onVote?: (pollId: string, selected: string[]) => void;
    onVoteRemove?: () => void;
    styles?: CustomStyles;
}

const PollWidget: React.FC<PollWidgetProps> = ({ pollId, title, options, multiple = false, onVote, onVoteRemove, styles }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [currentOptions, setCurrentOptions] = useState<PollOption[]>(options)

    const totalVotes = currentOptions.reduce((count: number, option: PollOption) => option.votes + count, 0);

    // If you click on a radio button that is already selected, the value does not change, so the onChange event does not fire again.
    // A checkbox fires onChange every time you click it, since it toggles between checked and unchecked states.
    const handleSelect = (id: string) => {
        setSelectedOptions((prevSelected) => {
            let newSelection;

            if (multiple) {
                const updatedOptions = currentOptions.map((option: PollOption) => {
                    if (prevSelected.includes(option.id) && option.id == id) {
                        return { ...option, votes: Math.max((option.votes || 0) - 1, 0) };
                    } else {
                        if (id == option.id) {
                            return { ...option, votes: option.votes + 1 };
                        } else {
                            return option;
                        }
                    }
                });
                setCurrentOptions(updatedOptions);

                newSelection = prevSelected.includes(id)
                    ? prevSelected.filter((opt) => opt !== id)
                    : [...prevSelected, id];
            } else {
                newSelection = [id];
                //increase current vote for this id and reduce last voted option
                const updatedOptions = currentOptions.map((option: PollOption) => {
                    if (id === option.id) {
                        return { ...option, votes: option.votes + 1 };
                    } else {
                        const shouldDecreaseLastVotedOption = selectedOptions.includes(option.id);
                        if (shouldDecreaseLastVotedOption) {
                            return { ...option, votes: Math.max((option.votes || 0) - 1, 0) };
                        } else {
                            return option;
                        }
                    }
                });
                setCurrentOptions(updatedOptions);
            }
            onVote?.(pollId, newSelection);
            return newSelection;
        });
    };

    const handleRemoveVotes = () => {
        setSelectedOptions([]);
        onVote?.(pollId, []);
        onVoteRemove?.();
    };


    useEffect(() => {
        setCurrentOptions(options);
    }, [options])


    return (
        <fieldset className="poll-widget" role={multiple ? "group" : "radiogroup"} aria-labelledby="poll-title">
            <legend id="poll-title" className="poll-title" style={styles?.title}>{title}</legend>
            <ul className={`poll-options ${currentOptions.length > 5 ? "scroll" : ''}`}>
                {currentOptions.map((option) => {
                    const votePercentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;
                    return (
                        <li key={option.id} className="poll-option" style={styles?.optionContainer}>
                            <label htmlFor={`poll-${option.id}`}>
                                <input
                                    type={multiple ? "checkbox" : "radio"}
                                    name={`poll-${pollId}`}
                                    id={`poll-${option.id}`}
                                    value={option.id}
                                    checked={selectedOptions.includes(option.id)}
                                    onChange={() => handleSelect(option.id)}
                                    aria-checked={selectedOptions.includes(option.id)}
                                    aria-describedby={`vote-info-${option.id}`}
                                />
                                <span id={`vote-info-${option.id}`} aria-live="polite">
                                    {option.label} ({option.votes} votes) ({votePercentage}%)
                                </span>
                            </label>
                            <div className="progress-bar-container" aria-hidden="true">
                                <div
                                    className="progress-bar"
                                    style={{
                                        ...styles?.progressBar,
                                        transform: `scaleX(${Number(votePercentage) / 100})`,
                                    }}
                                />

                            </div>
                        </li>
                    );
                })}
            </ul>
            <button className="remove-button" onClick={handleRemoveVotes}>Remove</button>
        </fieldset>

    );
};

export default PollWidget;


/*
Necessary ARIA Fixes and Additions
aria-labelledby for <fieldset>

A <fieldset> with role="group" should have aria-labelledby pointing to the <legend>, ensuring assistive technology associates the group with its label.

 
<fieldset className="poll-widget" role="group" aria-labelledby="poll-title">
Add id="poll-title" to the <legend>:

 
<legend id="poll-title" className="poll-title" style={styles?.title}>{title}</legend>
role="radiogroup" when using radio buttons

If multiple is false (meaning it's a single-choice poll), change role="group" to role="radiogroup" for better semantics.

 
<fieldset className="poll-widget" role={multiple ? "group" : "radiogroup"} aria-labelledby="poll-title">
aria-describedby for poll options

Screen readers should understand the meaning of votes. Associate each input with a span containing vote details.

 
<input
    type={multiple ? "checkbox" : "radio"}
    name={`poll-${pollId}`}
    id={`poll-${option.id}`}
    value={option.id}
    checked={selectedOptions.includes(option.id)}
    onChange={() => handleSelect(option.id)}
    aria-checked={selectedOptions.includes(option.id)}
    aria-describedby={`vote-info-${option.id}`}  // Add this
/>
Then, update the <span> for vote details:

 
<span id={`vote-info-${option.id}`}>
    {option.label} ({option.votes} votes) ({votePercentage}%)
</span>
aria-hidden="true" for purely visual elements

The progress bar is purely decorative and should be hidden from screen readers.

 
<div className="progress-bar-container" aria-hidden="true">
aria-live="polite" for dynamic vote updates

If votes update dynamically, wrap the vote count in a span with aria-live="polite", so screen readers announce the updates without being too disruptive.

 
<span id={`vote-info-${option.id}`} aria-live="polite">
    {option.label} ({option.votes} votes) ({votePercentage}%)
</span>

*/
