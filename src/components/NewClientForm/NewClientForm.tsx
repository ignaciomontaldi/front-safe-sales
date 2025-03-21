import { toast, Toaster } from "sonner";
import './newClientForm.css'
import { useForm } from "react-hook-form";
import CreateCostumerScheme from '../../schemes/CreateCostumerScheme';
import { CreateClientFormData } from "../../types/forms.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbAlertCircle } from "react-icons/tb";
import { createCostumer } from "../../service/customers.service";

type NewClientFormParams = {
    setClientView: (num : number) => void,
  };

function NewClientForm({setClientView} : NewClientFormParams) {

    const {register, handleSubmit, formState: {errors}} = useForm<CreateClientFormData>({
        resolver: yupResolver(CreateCostumerScheme)
    })

    const onSubmit = async (data : CreateClientFormData) => {
        // console.log(data);
        const response = await createCostumer(data);
        if(response.ok) {
            setClientView(0);
            toast.success('Cliente creado con éxito');
        } else {
            toast.error('Error al crear el cliente');
        }
    }

  return (
    <section id="new-client-form-container">
      <Toaster richColors visibleToasts={1} />
      <h1 className="text-2xl font-semibold text-softBlack">Nuevo Cliente</h1>
      <form id="new-client-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="fullname">Nombre y Apellido</label>
          <input type="text" id="fullname-input" {...register('fullname')}/>
          {errors && errors?.fullname && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.fullname.message}</p>
            </div>}
        </fieldset>
        <fieldset>
          <label htmlFor="frequency">Frecuencia</label>
          <select  id="frequency-input" {...register('frequency')}>
                <option value="BAJA">BAJA</option>
                <option value="MEDIA">MEDIA</option>
                <option value="ALTA">ALTA</option>
          </select>
          {errors && errors?.frequency && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.frequency.message}</p>
            </div>}
        </fieldset>
        <fieldset>
          <label htmlFor="phone">Número de Contacto</label>
          <input type="text" id="phone-input" {...register('phone')}/>
          {errors && errors?.phone && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.phone.message}</p>
            </div>}
        </fieldset>
        <div id="btn-container">
            <button className="bg-softBlack">Crear Cliente</button>
        </div>
      </form>
    </section>
  );
}

export default NewClientForm;
