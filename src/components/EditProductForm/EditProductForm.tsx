import { Product } from "../../types/product.types";
import { useForm } from "react-hook-form";
import { EditProductFormData } from "../../types/forms.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditProductScheme } from "../../schemes/EditProductScheme";
import { useEditField } from "../../hooks/useEditField";
import { TbAlertCircle } from "react-icons/tb";
import { editProductById } from "../../service/products.service";
import { toast } from "sonner";
import { useEffect } from "react";
import "./editproductForm.css";
import Loading from "../Loading/Loading";
import { useLoading } from "../../hooks/useLoading";

type EditProductFormParams = {
  product: Product;
  setInventoryView: (tab: number) => void;
  setEditProduct: (product: Product | null) => void;
};

function EditProductForm({
  product,
  setInventoryView,
  setEditProduct,
}: EditProductFormParams) {
  const { setChange } = useEditField();
  const {load, setLoad} = useLoading()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductFormData>({
    resolver: yupResolver(EditProductScheme),
    defaultValues: {
      id: product.id,
    },
  });

  const onSubmit = async (data: EditProductFormData) => {
    const response = await editProductById(data);
    if(response.ok) {
      toast.success("Producto actualizado con éxito");
      setEditProduct(null);
      setInventoryView(0);
      setChange(false);
    } else {
      toast.error("Error al actualizar el producto. Intente nuevamente");
    }
  };

  const cancelEdit = () => {
    setEditProduct(null);
    setInventoryView(0);
    setChange(false);
  };

  useEffect(() => {
      setLoad(true);
      if (!product) {
        setInventoryView(0);
      }
      setLoad(false);
  }, [product, setInventoryView, setLoad]);

  return (
    <>
      {product && (
        <>
          <h1 className="my-2 text-2xl font-bold text-softBlack">
            Actualizar Producto
          </h1>
          <Loading message="Cargando datos del producto..."/>
          {!load && <>
            <form id="edit-product-form" onSubmit={handleSubmit(onSubmit)}>
            <div id="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                defaultValue={product.name}
                {...register("name")}
              />
              {errors && errors?.name && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.name.message}</p>
              </div>}
            </div>
            <div id="form-group">
              <label htmlFor="trademark">Marca</label>
              <input
                type="text"
                id="trademark"
                defaultValue={product.trademark}
                {...register("trademark")}
              />
              {errors && errors.trademark && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.trademark.message}</p>
              </div>}
            </div>
            <div id="form-group">
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                id="price"
                defaultValue={product.price}
                {...register("price")}
              />
              {errors && errors?.price && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.price.message}</p>
              </div>}
            </div>
            <div id="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                defaultValue={product.stock}
                {...register("stock")}
              />
              {errors && errors.stock && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.stock.message}</p>
              </div>}
            </div>
            <div id="form-group">
              <label htmlFor="stock">Proveedor</label>
              <input
                type="text"
                id="supplier"
                defaultValue={product.supplier}
                {...register("supplier")}
              />
              {errors && errors.supplier && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.supplier.message}</p>
              </div>}
            </div>
            <div id="btn-container">
              <button type="submit" id="edit-btn">
                Actualizar Producto
              </button>
              <button type="button" id="cancel-btn" onClick={cancelEdit}>
                Cancelar
              </button>
            </div>
          </form>
          </>}
        </>
      )}
    </>
  );
}

export default EditProductForm;
