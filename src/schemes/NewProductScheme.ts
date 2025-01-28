import * as yup from 'yup'

export const NewProductScheme = yup.object({
    name: yup.string().required('Este campo es obligatorio'),
    trademark : yup.string().required('Este campo es obligatorio'),
    price : yup.number().required('Este campo es obligatorio'),
    stock : yup.number(),
    supplier : yup.string().required('Este campo es obligatorio')
}).required()