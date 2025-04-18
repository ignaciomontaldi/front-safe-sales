import * as yup from "yup";

export const EditSupplierScheme = yup.object({
    id: yup.string().required("El id es obligatorio"),
    name: yup.string().required("El nombre es obligatorio"),
    phone: yup
                .number()
                .typeError('El teléfono debe ser un número')
                .positive('El teléfono debe ser positivo')
                .required("El teléfono es obligatorio"),
    products: yup.string().required("El producto es obligatorio"),
})