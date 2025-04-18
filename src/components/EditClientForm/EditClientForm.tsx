import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditField } from "../../hooks/useEditField";
import { TbAlertCircle } from "react-icons/tb";
import { toast } from "sonner";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { useLoading } from "../../hooks/useLoading";
import { Customer } from "../../types/customers.types";
import "./editClientForm.css";
import { EditClientScheme } from "../../schemes/EditClientScheme";
import { EditClientFormData } from "../../types/forms.types";
import { updateCustomerById } from "../../service/customers.service";

type EditClientFormParams = {
  customer: Customer;
  setEditClient: (client : Customer | null) => void;
  setClientView: (view : number) => void;
};

function EditClientForm({
  customer,
  setEditClient,
  setClientView
}: EditClientFormParams) {
  const { setChange } = useEditField();
  const {load, setLoad} = useLoading()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditClientFormData>({
    resolver: yupResolver(EditClientScheme),
    defaultValues: {
      id: customer.id,
    },
  });

  const onSubmit = async (data : EditClientFormData) => {
    const response = await updateCustomerById(data);
        if(response.ok) {
          toast.success("Producto actualizado con éxito");
          setEditClient(null);
          setClientView(0);
          setChange(false);
        } else {
          toast.error("Error al actualizar el producto. Intente nuevamente");
        }
  };

  const cancelEdit = () => {
    setEditClient(null);
    setClientView(0);
    setChange(false);
  };

  useEffect(() => {
      setLoad(true);
      if (!customer) {
        setClientView(0);
      }
      setLoad(false);
  }, [customer, setClientView, setLoad]);

  return (
    <>
      {customer && (
        <>
          <h1 className="my-2 text-2xl font-bold text-softBlack">
            Actualizar Cliente
          </h1>
          <Loading message="Cargando datos del cliente..."/>
          {!load && <>
            <form id="edit-client-form" onSubmit={handleSubmit(onSubmit)}>
            <div id="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="fullname"
                defaultValue={customer.fullname}
                {...register("fullname")}
              />
              {errors && errors?.fullname && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.fullname.message}</p>
              </div>}
            </div>
            <div id="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="number"
                id="phone"
                defaultValue={customer.phone}
                {...register("phone")}
              />
              {errors && errors.phone && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.phone.message}</p>
              </div>}
            </div>
            <div id="form-group">
              <label htmlFor="frequency">Frecuencia</label>
              <select id="frequency" defaultValue={customer.frequency} {...register("frequency")}>
                <option value="BAJA">BAJA</option>
                <option value="MEDIA">MEDIA</option>
                <option value="ALTA">ALTA</option>
              </select>
              {errors && errors?.frequency && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.frequency.message}</p>
              </div>}
            </div>
            <div id="btn-container">
              <button type="submit" id="edit-btn">
                Actualizar Cliente
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

export default EditClientForm;
