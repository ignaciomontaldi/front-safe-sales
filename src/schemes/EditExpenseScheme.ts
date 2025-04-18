import * as yup from "yup";

export const EditExpenseScheme = yup.object({
    id: yup.string().required("El id de la expensa es obligatorio."),
    name: yup.string().required("El nombre de la expensa es obligatorio."),
    type: yup.string().required("El tipo de gasto es obligatorio."),
    status: yup.string().oneOf(["PAGADO", "PENDIENTE"], "Debe seleccionar un estado").required("El estado es obligatorio."),
    amount: yup
        .number()
        .typeError("El monto debe ser un número.")
        .positive("El monto debe ser mayor a 0.")
        .required("El monto es obligatorio."),
}).required();