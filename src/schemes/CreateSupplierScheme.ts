import * as yup from "yup";

const CreateSupplierScheme = yup.object({
    name: yup.string().min(4, 'Mínimo 4 carácteres').required('Este campo es obligatorio.'),
    phone: yup.number().typeError('Debes ingresar un número').positive('Debes ingresar un número positivo').min(6, 'Mínimo 6 carácteres').required('Este campo es obligatorio.'),
    products: yup.string().min(4, 'Mínimo 4 carácteres').required('Este campo es obligatorio')
}).required();

export default CreateSupplierScheme;