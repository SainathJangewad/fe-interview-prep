
import { useEffect, useState } from "react"
import './Autocomplete.scss'
import SuggestionsList from "./suggestion-list/SuggestionList";
import { useDebounce } from "../../hooks/useDebounce";

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
}) => {
    const [value, setValue] = useState("");
    const [suggestionData, setSuggestionData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: any) => {
        console.log(e);
        setValue(e.target.value);
    }

    const fetchSuggestions = async (query: string) => {
        setError(null);
        setLoading(true);
        try {
            let result: string[] = [];
            if (staticData) {
                result = staticData?.filter((item: string) => item.toLowerCase().includes(query.toLocaleLowerCase()));
                setSuggestionData(result);
            } else if (getSuggestions) {
                result = await getSuggestions(query);
                setSuggestionData(result);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const debouncedValue = useDebounce(value, 1000, () => { console.log('cb run') });

    const hanldeSuggestionSelect = (suggestion: any) => {
        setValue(dataKey ? suggestion[dataKey] : suggestion);
        setSuggestionData([]);
        if (onSelect) {
            onSelect(suggestion)
        }
    }

    useEffect(() => {
        if (!value) {
            setSuggestionData([]);
        }
    }, [value])

    useEffect(() => {
        if (debouncedValue) {
            fetchSuggestions(debouncedValue)
        }
    }, [debouncedValue])

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
        />

        {loading && (customLoader ? customLoader : <div className="loader"> "Loading..."</div>)}
        {error && <div className="error">{error} </div>}

        {suggestionData.length > 0 && <SuggestionsList
            suggestions={suggestionData}
            onSuggestionSelect={hanldeSuggestionSelect}
            dataKey={dataKey}
            textToHighlight={value}
        />}
    </div>
}

export default Autocomplete;