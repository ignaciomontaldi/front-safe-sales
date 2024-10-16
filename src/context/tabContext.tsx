import React, { ReactNode, useState } from "react";
import { createContext } from "react";

interface TabContextType {
    tab: number;
    setTab: (value:number) => void;
}

interface TabProviderProps {
    children: ReactNode;
}

export const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider:React.FC<TabProviderProps> = ({children}) => {
    const [tab, setTab] = useState<number>(0);
    return (
        <TabContext.Provider value={{tab, setTab}}>
            {children}
        </TabContext.Provider>
    )
}