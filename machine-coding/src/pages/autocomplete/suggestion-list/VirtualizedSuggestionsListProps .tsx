import { useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";

interface VirtualizedSuggestionsListProps {
    dataKey: string;
    textToHighlight: string;
    onSuggestionSelect: (suggestion: any) => void;
    suggestions: any[];
    selectedIndex: number;
}

const VirtualizedSuggestionsList: React.FC<VirtualizedSuggestionsListProps> = ({
    dataKey,
    textToHighlight,
    onSuggestionSelect,
    suggestions,
    selectedIndex,
}) => {
    const listRef = useRef<any>(null); // Ref for react-window's List
    const ITEM_HEIGHT = 40;
    const LIST_HEIGHT = 200;


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
        if (selectedIndex !== -1 && listRef.current) {
            listRef.current.scrollToItem(selectedIndex, "center"); // Ensure selected item is visible
        }
    }, [selectedIndex]);

    const Row: React.FC<{ index: number, style: React.CSSProperties }> = ({ index, style }) => {
        const suggestion = suggestions[index];
        const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return (
            <li
                className={`suggestions-list-item ${selectedIndex === index ? "active" : ""}`}
                onClick={() => onSuggestionSelect(suggestion)}
                role="option"
                aria-selected={selectedIndex === index}
                id={`suggestion-${index}`}
                style={style} // Required for react-window
            >
                {highlightSearchTerm(currentSuggestion, textToHighlight)}
            </li>
        );
    };

    return (
        <List
            height={LIST_HEIGHT}
            itemCount={suggestions.length}
            itemSize={ITEM_HEIGHT}
            width="100%"
            ref={listRef} // Attach ref to access scrollToItem 
        >
            {Row}
        </List>
    );
};

export default VirtualizedSuggestionsList;
