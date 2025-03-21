import "./createSaleForm.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { TbAlertCircle } from "react-icons/tb";
import { toast, Toaster } from "sonner";
import CreateSaleScheme from "../../schemes/CreateSaleScheme";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/products.service";
import { Product } from "../../types/product.types";
import { createSale } from "../../service/sales.service";
import { CreateSaleFormData } from "../../types/forms.types";
import { Customer } from "../../types/customers.types";
import { getCustomers } from "../../service/customers.service";
import { MdLightbulbOutline } from "react-icons/md";

function CreateSaleForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateSaleFormData>({
    resolver: yupResolver(CreateSaleScheme),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productList",
  });

  const productList = watch('productList');

  const totalPrice = productList?.reduce((acc, item) => {
    const product = products.find((p) => p.name === item.name);
    return acc + (product ? Number(product.price) * item.quantity : 0);
  }, 0);
  

  useEffect(() => {
    const fetchData = async () => {
      const [products, customers] = await Promise.all([
        getProducts(),
        getCustomers(),
      ]);
      if (products && customers) {
        setProducts(products);
        setCustomers(customers);
      } else {
        throw new Error("Could not find products");
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data: CreateSaleFormData) => {
    const response = await createSale(data);
    if (response === 0) {
      toast.success("Venta creada con éxito");
    } else {
      toast.error("Hubo un problema al hacer la venta. Intente nuevamente");
    }
  };

  return (
    <>
      <section id="create-form-view">
        <Toaster richColors visibleToasts={1} />
        <h1 className="text-2xl font-semibold text-softBlack">Crear Venta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset id="product-fieldset">
            {fields.map((field, index) => {
              const selectedProduct = products.find(
                (p) => p.name === watch(`productList.${index}.name`)
              );
              return (

              <div id="product-quantity-container" key={field.id}>
                <select
                  id="product-input"
                  {...register(`productList.${index}.name`)}
                >
                  <option value="">Seleccione un producto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name} {product.trademark}
                    </option>
                  ))}
                </select>
                {errors && errors.productList?.[index]?.name && (
                  <div id="error-container">
                    <TbAlertCircle />
                    <p id="error-msg">
                      {errors.productList?.[index]?.name.message}
                    </p>
                  </div>
                )}
                {selectedProduct && <div className="flex items-center">
                  <MdLightbulbOutline className="text-lg text-softBlack mr-4"/>
                  <p className="text-md text-softBlack">Precio Unitario: ${selectedProduct?.price}</p>
                </div>}
                <label>Cantidad</label>
                <input
                  type="number"
                  id="quantity-input"
                  min={1}
                  {...register(`productList.${index}.quantity`)}
                />
                {errors && errors.productList?.[index]?.quantity && (
                  <div id="error-container">
                    <TbAlertCircle />
                    <p id="error-msg">
                      {errors.productList?.[index]?.quantity.message}
                    </p>
                  </div>
                )}
                <button
                  id="remove-product-btn"
                  type="button"
                  onClick={() => {
                    remove(index);
                    toast.error("Campo eliminado");
                  }}
                >
                  Quitar Producto
                </button>
              </div>
              )
            })}
            <button
              type="button"
              id="add-product-btn"
              onClick={() => {
                append({ name: "", quantity: 0 });
                toast.info("Se ha añadido un nuevo campo");
              }}
            >
              Agregar Producto
            </button>
            <div id="error-container">
              {errors && errors.productList && (
                <p id="error-msg">{errors.productList?.message}</p>
              )}
            </div>
          </fieldset>
          {totalPrice !== 0 && 
          <fieldset>
            <p className="text-lg text-softBlack font-bold">TOTAL A PAGAR: ${totalPrice}</p>
          </fieldset>}
          <fieldset>
            <label htmlFor="customer-input">Cliente</label>
            <select id="customer-input" {...register("customer")}>
              <option value="0">Seleccionar cliente</option>
              {customers.map((customer) => {
                return (
                  <option key={customer.id} value={customer.fullname}>
                    {customer.fullname}
                  </option>
                );
              })}
            </select>
            {errors && errors.customer && (
              <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.customer?.message}</p>
              </div>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="payment-method">Medio de pago</label>
            <select id="payment-method" {...register("payment")}>
              <option value="EFECTIVO">Efectivo</option>
              <option value="DEBITO">Débito</option>
              <option value="CREDITO">Crédito</option>
              <option value="TRANSFERENCIA">Transferencía</option>
              <option value="QR">QR</option>
            </select>
            {errors && errors.payment && (
              <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.payment?.message}</p>
              </div>
            )}
          </fieldset>
          <div id="btn-container">
            <button className="bg-softBlack" type="submit" id="submit-btn">
              Crear Venta
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateSaleForm;
