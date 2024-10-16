import { useContext } from "react"
import { SearchContext } from "../context/searchContext";

export const useSearch = () => {
    const context = useContext(SearchContext);

    if(!context) {
        throw new Error("useSearch must be used within a Searchprovider")
    }

    return context;
}