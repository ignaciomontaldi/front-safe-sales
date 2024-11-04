import React, { ReactNode, useState } from "react";
import { createContext } from "react";

interface LoadingContextType {
    load: boolean;
    setLoad: (value:boolean) => void;
}

interface LoadingProviderProps  {
    children: ReactNode;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider:React.FC<LoadingProviderProps> = ({children}) => {
    const [load, setLoad] = useState<boolean>(false);
    return (
        <LoadingContext.Provider value={{load, setLoad}}>
            {children}
        </LoadingContext.Provider>
    )
}