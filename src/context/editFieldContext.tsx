import { createContext, useState } from "react";

type EditFieldContextType = {
    change: boolean;
    setChange: (value:boolean) => void
}

type EditFieldProvider = {
    children : React.ReactNode
}
export const EditFieldContext = createContext<EditFieldContextType | undefined>(undefined)

export const EditFieldProvider:React.FC<EditFieldProvider> = ({children}) => {
    const [change, setChange] = useState<boolean>(false);

    return (
        <EditFieldContext.Provider value={{change, setChange}}>
            {children}
        </EditFieldContext.Provider>
    )
}