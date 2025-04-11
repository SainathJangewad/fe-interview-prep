
import { useEffect, useState } from "react"
import './Autocomplete.scss'
import SuggestionsList from "./suggestion-list/SuggestionList";
import { useDebounce } from "../../hooks/useDebounce";
import { useCache } from "../../hooks/useCache";

interface AutocompleteProps {
    suggestions: string[],
    getSuggestions: (query: string) => Promise<string[]>,
    dataKey: string,
    placeholder: string,
    onChange?: (input: string) => void,
    staticData?: string[],
    onBlur: (e: any) => void,
    onFocus: (e: any) => void,
    onSelect: (res: any) => void,
    customLoader?: React.ReactNode,
    customStyles?: React.CSSProperties,
    caching?: boolean,
}

const Autocomplete: React.FC<AutocompleteProps> = ({
    suggestions,
    getSuggestions,
    dataKey,
    placeholder,
    onChange,
    staticData,
    onBlur,
    onSelect,
    onFocus,
    customStyles,
    customLoader,
    caching = false,
}) => {
    const [value, setValue] = useState("");
    const [suggestionData, setSuggestionData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [skipNextFetch, setSkipNextFetch] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const { setCache, getCache } = useCache('autocomplete', 86400);

    const handleChange = (e: any) => {
        setValue(e.target.value);
        if (skipNextFetch) {
            setSkipNextFetch(false);  // Reset after skipping once
        }
    }

    const fetchSuggestions = async (query: string) => {
        setError(null);

        const cachedData = getCache(query);
        if (caching && cachedData) {
            setSuggestionData(cachedData);
            return;
        }

        setLoading(true);
        try {
            let result: string[] = [];
            if (staticData) {
                result = staticData?.filter((item: string) => item.toLowerCase().includes(query.toLocaleLowerCase()));
                setSuggestionData(result);
            } else if (getSuggestions) {
                result = await getSuggestions(query);
                setCache(query, result);
                setSuggestionData(result);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const debouncedValue = useDebounce(value, 1000, () => { console.log('cb run') });

    const handleSuggestionSelect = (suggestion: any) => {
        setValue(dataKey ? suggestion[dataKey] : suggestion);
        setSuggestionData([]);
        setSkipNextFetch(true);
        if (onSelect) {
            onSelect(suggestion)
        }
    }

    const handleKeyDown = (event: any) => {
        const key = event.key;
        console.log(key);
        if (key == 'ArrowUp') {
            setSelectedIndex((prev: number) => {
                const newIdx = (prev - 1 + suggestionData.length) % suggestionData.length;
                return newIdx;
            })
        } else if (key == 'ArrowDown') {
            setSelectedIndex((prev: number) => {
                const newIdx = (prev + 1) % suggestionData.length;
                return newIdx;
            })
        } else if (key == 'Enter') {
            if (selectedIndex >= 0) {
                handleSuggestionSelect(suggestionData[selectedIndex])
                setSkipNextFetch(true);
            }
        }
    }


    useEffect(() => {
        setSelectedIndex(-1);
        if (!value) {
            setSuggestionData([]);
        }
    }, [value])

    useEffect(() => {
        if (debouncedValue && !skipNextFetch) {
            fetchSuggestions(debouncedValue)
        }
    }, [debouncedValue, skipNextFetch])

    return <div className="autocomplete"
        aria-expanded={suggestionData.length > 0}
        aria-owns="suggestions-list"
        role="combobox"
    >
        <input
            className="input-box"
            role="textbox"
            aria-autocomplete="list"
            aria-controls="suggestions-list"
            aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            style={customStyles}
            onKeyDown={handleKeyDown}
        />

        {loading && (customLoader ? customLoader : <div className="loader" role="status" aria-live="polite"> "Loading..."</div>)}
        {error && <div className="error" role="alert">{error} </div>}

        {suggestionData.length > 0 && <SuggestionsList
            suggestions={suggestionData}
            onSuggestionSelect={handleSuggestionSelect}
            dataKey={dataKey}
            textToHighlight={value}
            selectedIndex={selectedIndex}
        />}
    </div>
}

export default Autocomplete;


// ARIA Enhancements:
// role="combobox" - Indicates that the div acts as a combo box.
// aria-expanded - Dynamically updates based on whether suggestions are shown.
// aria-owns="suggestions-list" - Links the input to the suggestions list.
// role="textbox" - Explicitly marks the input as a text field.
// aria-autocomplete="list" - Indicates that autocomplete suggestions are provided.
// aria-controls="suggestions-list" - Associates the input with the suggestions list.
// aria-activedescendant - Highlights the currently selected suggestion.
// role="status" and aria-live="polite" - Ensures that loading messages are announced to screen readers.
// role="alert" - Ensures that error messages are immediately announced.


// 1. role = "combobox"
// What it does: This tells assistive technologies(like screen readers) that this < div > acts as a combo box(a dropdown input field with suggestions).
// Why we need it: Without this, screen readers might just see a < div > and not recognize it as an interactive component.
// 2. aria - expanded={ suggestionData.length > 0 }
// What it does: It informs assistive technologies whether the dropdown list is expanded(true) or collapsed(false).
// Why we need it: This helps screen reader users know when suggestions are available.
// 3. aria - owns="suggestions-list"
// What it does: It explicitly tells assistive technologies that the input field "owns" the list of suggestions(even if the list is rendered separately).
// Why we need it: This ensures the screen reader correctly associates the input field with the suggestion list.
// 4. role = "textbox"
// What it does: It specifies that the < input > is a text input.
// Why we need it: Though < input type = "text" > is inherently a textbox, explicitly defining it helps screen readers correctly interpret the role.
// 5. aria - autocomplete="list"
// What it does: It tells assistive technologies that this input provides autocomplete suggestions.
// Why we need it: This informs users that as they type, they will receive suggestions.
// 6. aria - controls="suggestions-list"
// What it does: It links the input field to the suggestion list(id = "suggestions-list").
// Why we need it: This tells screen readers that the input is controlling another element(the list of suggestions).
// 7. aria - activedescendant={ selectedIndex >= 0 ? suggestion - ${ selectedIndex } : undefined }
// What it does: It helps identify which suggestion is currently highlighted by keyboard navigation.
// Why we need it: This ensures that when a user navigates with the arrow keys, their screen reader announces the currently highlighted suggestion.
// 8. role = "status" and aria - live="polite"
// What it does:
// role = "status" tells assistive technologies that this element contains status messages(like "Loading...").
//     aria - live="polite" ensures that updates(like loading messages) are read aloud but do not interrupt the user’s current action.
// Why we need it: This helps users get feedback without disrupting their workflow.
// 9. role = "alert"
// What it does: This marks the error message as an important notification.
// Why we need it: When an error occurs, a screen reader will immediately announce it.


