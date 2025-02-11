import { useState } from 'react';
import Autocomplete from './Autocomplete';

const STATIC_DATA = ["ann", "john"];

const AutocompleteParent = () => {
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const fetchSuggestions = async (query: string) => {
        let res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
        if (!res.ok) {
            throw new Error("romething went wrong");
        }
        let data = await res.json();
        return data?.recipes;
    };

    return (
        <Autocomplete
            suggestions={suggestions}
            getSuggestions={fetchSuggestions}
            // staticData={STATIC_DATA}
            dataKey={"name"}
            onChange={(input: string) => { }}
            placeholder={"Search"}
            onSelect={(res: any) => { }}
            onBlur={(e: any) => { }} //
            onFocus={(e: any) => { }}
            customStyles={{}}
            customLoader={<>Loading...</>}
            caching={true}
        />
    );
};

export default AutocompleteParent;
