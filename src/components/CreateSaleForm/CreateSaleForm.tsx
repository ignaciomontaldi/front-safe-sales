import "./createSaleForm.css"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TbAlertCircle } from "react-icons/tb";
import { toast, Toaster } from "sonner";
import CreateSaleScheme from "../../schemes/CreateSaleScheme";

type FormData = {
    productList: string,
    totalPrice: string,
    paymentMethod: string,
}

function CreateSaleForm() {
    const {register, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: yupResolver(CreateSaleScheme)
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        toast.success("Venta creada con éxito")
        
    }

  return (
    <>
        <section>
            <Toaster richColors />
            <h1 className="text-2xl font-semibold text-softBlack">Crear Venta</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="product-list">Cantidad de productos</label>
                    <textarea rows={5} cols={30}  className={errors.totalPrice && "border-2 border-redSalmon"} {...register("productList")}></textarea>
                    {errors && errors.productList && <div id="error-container"><TbAlertCircle /><p id="error-msg">{errors.productList?.message}</p></div>}
                </fieldset>
                <fieldset>
                    <label htmlFor="total-price">Importe a pagar</label>
                    <input type="text" className={errors.totalPrice && "border-2 border-redSalmon"} id="total-price" {...register("totalPrice")}/>
                    {errors && errors.productList && <div id="error-container"><TbAlertCircle /><p id="error-msg">{errors.totalPrice?.message}</p></div>}
                </fieldset>
                <fieldset>
                    <label htmlFor="payment-method">Medio de pago</label>
                    <select id="payment-method" {...register("paymentMethod")}>
                        <option value="cash">Efectivo</option>
                        <option value="debit">Débito</option>
                        <option value="credit">Crédito</option>
                        <option value="transfer">Transferencía</option>
                    </select>
                    {errors && errors.paymentMethod && <div id="error-container"><TbAlertCircle /><p id="error-msg">{errors.paymentMethod?.message}</p></div>}
                </fieldset>
                <div id="btn-container">
                    <button className="bg-softBlack" type="submit" id="submit-btn">Crear Venta</button>
                    <button className="bg-darkGray" type="reset" id="reset-btn">Borrar Datos</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default CreateSaleForm