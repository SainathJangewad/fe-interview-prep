import './SuggestionList.scss'

interface SuggestionsListProps {
    dataKey: string,
    textToHighlight: string,
    onSuggestionSelect: (suggestion: any) => void,
    suggestions: any[],
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
    dataKey,
    textToHighlight,
    onSuggestionSelect,
    suggestions,
}) => {


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


    return <>
        <ul className='suggestions-list'>
            {
                suggestions?.map((suggestion: any, index: number) => {
                    const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
                    return <li
                        className='suggestions-list-item'
                        onClick={(e: any) => onSuggestionSelect(suggestion)}
                    >
                        {highlightSearchTerm(currentSuggestion, textToHighlight)}
                    </li>
                })
            }
        </ul>
    </>
}

export default SuggestionsList