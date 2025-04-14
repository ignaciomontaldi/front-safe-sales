import * as yup from "yup";

export const EditClientScheme = yup.object({
    fullname: yup.string().required("El nombre es requerido"),
    phone: yup.number().typeError('El teléfono debe ser un número').required("El teléfono es requerido"),
    frequency: yup.string().oneOf(["BAJA", "MEDIA", "ALTA"], "Frecuencia inválida").required("La frecuencia es requerida"),
}).required();