import { useEffect, useRef } from 'react';
import './SuggestionList.scss'

interface SuggestionsListProps {
    dataKey: string,
    textToHighlight: string,
    onSuggestionSelect: (suggestion: any) => void,
    suggestions: any[],
    selectedIndex: number,
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
    dataKey,
    textToHighlight,
    onSuggestionSelect,
    suggestions,
    selectedIndex,
}) => {

    const listRef = useRef<HTMLUListElement>(null);

    function highlightSearchTerm(text: string, searchTerm: string): JSX.Element {
        // Why use regex to split the text?
        //
        // 1. **Case-Insensitive Matching**: The "i" flag in regex makes the search term matching case-insensitive.
        // 2. **Captures the Search Term**: Using a capturing group `(${searchTerm})` allows us to keep the search term
        //    in the split result, making it easy to style or manipulate separately from the surrounding text.
        // 3. **Multiple Occurrences**: Regex handles all occurrences of the search term globally in the string.

        // --- Example with regex (Recommended) ---
        // const text = "I am learning React and React Native.";
        // const searchTerm = "React";
        // const regex = new RegExp(`(${searchTerm})`, "gi");
        // const partsWithRegex = text.split(regex);

        // console.log(partsWithRegex);
        // Output: ["I am learning ", "React", " and ", "React", " Native."]
        // ✅ Search term is preserved and can be styled separately.

        // --- Example without regex ---
        // const partsWithoutRegex = text.split(searchTerm);

        // console.log(partsWithoutRegex);
        // Output: ["I am learning ", " and ", " Native."]
        // ❌ Search term is removed completely, making it impossible to highlight.
        //
        // --- Key Differences ---
        // - **With regex**: The search term is kept as a separate part of the array, allowing easy highlighting.
        // - **Without regex**: The search term is lost in the split, making it harder to manipulate.

        const regex = new RegExp(`(${searchTerm})`, "gi");
        const parts = text.split(regex);

        // console.log("regex obj", regex); // op : /(searchTerm)/gi here searchTerm is the value user types in the input field
        // split() accepts a string value or regExp as arguments 

        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <span key={index} style={{ fontWeight: "bold", color: "blue" }}>
                            {part}
                        </span>
                    ) : (
                        part
                    )

                )}
            </>
        );
    }

    useEffect(() => {
        if (selectedIndex != -1 && listRef.current) {
            const selectedListItem = listRef?.current.children[selectedIndex] as HTMLElement;
            if (selectedListItem) {
                selectedListItem.scrollIntoView({
                    behavior: "smooth",
                    block: 'nearest',
                })
                //Why Use block: "nearest" ?
                //It ensures that the selected item scrolls into view only when necessary, avoiding unnecessary jumps.
                // How It Works
                // If the selected item is already visible, it won’t scroll.
                // If the item is partially visible, it will scroll just enough to fully show it.
                // If the item is completely outside the viewport, it will bring it into view smoothly.
            }
        }
    }, [selectedIndex])


    return <>
        <ul className='suggestions-list'
            id="suggestions-list"
            role="listbox"
            ref={listRef}
        >
            {
                suggestions?.map((suggestion: any, index: number) => {
                    const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
                    return <li
                        className={`${selectedIndex == index ? 'active' : ''} suggestions-list-item`}
                        onClick={(e: any) => onSuggestionSelect(suggestion)}
                        role="option"
                        aria-selected={index == selectedIndex}
                        id={`suggestion-${index}`}

                    >
                        {highlightSearchTerm(currentSuggestion, textToHighlight)}
                    </li>
                })
            }
        </ul>
    </>
}

export default SuggestionsList