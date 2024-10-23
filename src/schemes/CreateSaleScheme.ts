import * as yup from "yup";
const CreateSaleScheme = yup.object({
    productList: yup.string().required("Este campo es obligatorio"),
    totalPrice: yup.string().matches(/^[0-9]+$/, "Solo se aceptan números").required("Este campo es obligatorio"),
    paymentMethod: yup.string().required("Este campo es obligatorio")
   .oneOf(["cash", "debit", "credit", "transfer"], "Medio de pago inválido")
}).required();

export default CreateSaleScheme