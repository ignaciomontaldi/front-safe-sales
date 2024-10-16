import React, { ReactNode, useState } from "react";
import { createContext } from "react";

interface FilterContextType {
    filter: string;
    setFilter: (value:string) => void;
}

interface FilterProviderProps  {
    children: ReactNode;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider:React.FC<FilterProviderProps> = ({children}) => {
    const [filter, setFilter] = useState<string>("price-desc");
    return (
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}