
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
    customStyles?: object,
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

    return <div className="autocomplete">
        <input
            className="input-box"
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            style={customStyles}
            onKeyDown={handleKeyDown}
        />

        {loading && (customLoader ? customLoader : <div className="loader"> "Loading..."</div>)}
        {error && <div className="error">{error} </div>}

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

