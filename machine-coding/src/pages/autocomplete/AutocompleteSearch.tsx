import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

// Utility function for debouncing
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Type definitions
interface Suggestion {
  id: number;
  name: string;
}

interface AutocompleteSearchProps {
  apiUrl: string;
  placeholder: string;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ apiUrl, placeholder }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // Track highlighted suggestion

  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input element
  const suggestionsRef = useRef<HTMLUListElement>(null); // Reference to suggestions list

  // Debounced query to prevent excessive API calls
  const debouncedQuery = useDebounce(query, 500);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${apiUrl}?query=${searchQuery}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // Trigger the fetch when the debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, fetchSuggestions]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        if (highlightedIndex < suggestions.length - 1) {
          setHighlightedIndex(highlightedIndex + 1);
        }
        break;
      case 'ArrowUp':
        if (highlightedIndex > 0) {
          setHighlightedIndex(highlightedIndex - 1);
        }
        break;
      case 'Enter':
        if (highlightedIndex >= 0) {
          setQuery(suggestions[highlightedIndex].name);
          setSuggestions([]); // Clear suggestions after selection
        }
        break;
      case 'Escape':
        setQuery(''); // Clear the input field on Escape
        setSuggestions([]); // Clear suggestions on Escape
        break;
      default:
        break;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="autocomplete-input"
      />
      {loading && <div>Loading...</div>}
      <ul
        ref={suggestionsRef}
        className="suggestions-list"
        role="listbox"
        aria-expanded={suggestions.length > 0 ? 'true' : 'false'}
      >
        {suggestions.length > 0 && !loading ? (
          suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              className={`suggestion-item ${highlightedIndex === index ? 'highlighted' : ''}`}
              role="option"
              aria-selected={highlightedIndex === index ? 'true' : 'false'}
              onMouseEnter={() => setHighlightedIndex(index)} // Highlight on mouse hover
              onClick={() => {
                setQuery(suggestion.name);
                setSuggestions([]);
              }}
            >
              {highlightMatch(suggestion.name, debouncedQuery)}
            </li>
          ))
        ) : (
          !loading && <div>No suggestions found.</div>
        )}
      </ul>
    </div>
  );
};

export default AutocompleteSearch;
