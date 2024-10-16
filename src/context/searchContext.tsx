import React, { ReactNode, useState } from "react";
import { createContext } from "react";

interface SearchContextType {
    inputValue: string;
    setInputValue: (value:string) => void;
}

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider:React.FC<SearchProviderProps> = ({children}) => {
    const [inputValue, setInputValue] = useState<string>("");
    return (
        <SearchContext.Provider value={{inputValue, setInputValue}}>
            {children}
        </SearchContext.Provider>
    )
}