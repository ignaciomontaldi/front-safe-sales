import * as yup from "yup";
const CreateSaleScheme = yup
  .object({
    productList: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("Debes seleccionar un producto."),
          // price: yup.number().typeError('Debes ingresar un número').required("Debes ingresar un precio"),
          quantity: yup
            .number()
            .typeError("Debes ingresar un número")
            .positive("El número debe ser mayor a 0")
            .required("Debes ingresar una cantidad"),
        })
      )
      .min(1, "Debes agregar al menos un producto"),
    customer: yup
      .string()
      .required('Este campo es obligatorio'),
    payment: yup
      .string()
      .required("Este campo es obligatorio")
      .oneOf(["EFECTIVO", "DEBITO", "CREDITO", "TRANSFERENCIA", "QR"], "Medio de pago inválido"),
  })
  .required();

export default CreateSaleScheme;
