import * as yup from 'yup';

export const EditProductScheme = yup.object({
    id: yup.string().required('Este campo es obligatorio'),
    name: yup.string().required('Este campo es obligatorio'),
    trademark : yup.string().required('Este campo es obligatorio'),
    price : yup.number().typeError('Debes ingresar un número').required('Este campo es obligatorio'),
    stock : yup.number().typeError('Debes ingresar un número').required('Este campo es obligatorio'),
    supplier : yup.string().required('Este campo es obligatorio')
}).required();