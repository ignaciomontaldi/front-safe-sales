import { useContext } from "react"
import { EditFieldContext } from "../context/editFieldContext";

export const useEditField = () => {
    const context = useContext(EditFieldContext);

    if(!context) {
        throw new Error('EditFieldContext must be used within a EditFieldProvider');
    }

    return context;
}