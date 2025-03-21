import * as yup from "yup";

const CreateCostumerScheme = yup.object({
    fullname: yup.string().required('Este campo es obligatorio.'),
    frequency: yup.string().required('Este campo es obligatorio').oneOf(['BAJA', 'MEDIA', 'ALTA'], 'Frecuencia inválida'),
    phone: yup.string().required('Este campo es obligatorio')
}).required();

export default CreateCostumerScheme;