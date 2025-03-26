import * as yup from "yup";

const CreateExpenseScheme = yup.object({
    name: yup.string().min(3, 'Mínimo 4 carácteres').required('Este campo es obligatorio.'),
    type: yup.string().required('Este campo es obligatorio'),
    amount: yup.number().positive('El valor debe ser positivo.').typeError('Debes ingresar un número').required('Este campo es obligatorio'),
}).required();

export default CreateExpenseScheme;