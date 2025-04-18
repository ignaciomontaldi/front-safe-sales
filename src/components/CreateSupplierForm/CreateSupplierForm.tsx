import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { TbAlertCircle } from 'react-icons/tb';
import './createSupplierForm.css'
import { CreateSupplierFormData } from '../../types/suppliers.types';
import CreateSupplierScheme from '../../schemes/CreateSupplierScheme';
import { createSupplier } from '../../service/suppliers.service';

type CreateSupplierFormParams = {
    setSuppliersView: (num : number) => void,
  };

function CreateSupplierForm({setSuppliersView} : CreateSupplierFormParams) {

    const {register, handleSubmit, formState: {errors}} = useForm<CreateSupplierFormData>({
        resolver: yupResolver(CreateSupplierScheme)
    })

    const onSubmit = async (data : CreateSupplierFormData) => {
      console.log(data);
        const response = await createSupplier(data);
        if(response.ok) {
            setSuppliersView(0);
            toast.success('Proveedor creado con éxito');
        } else {
            toast.error('Error al crear el proveedor');
        }
    }

  return (
    <section id="new-supplier-form-container">
      <Toaster richColors visibleToasts={1} />
      <h1 className="text-2xl font-semibold text-softBlack">Nuevo Proveedor</h1>
      <form id="new-supplier-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name-input" {...register('name')}/>
          {errors && errors?.name && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.name.message}</p>
            </div>}
        </fieldset>
        <fieldset>
          <label htmlFor="phone">Teléfono</label>
          <input type='number' id="phone-input" {...register('phone')}/>
          {errors && errors?.phone && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.phone.message}</p>
            </div>}
        </fieldset>
        <fieldset>
          <label htmlFor="products">Producto</label>
          <input type="text" id="products-input" {...register('products')}/>
          {errors && errors?.products && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.products.message}</p>
            </div>}
        </fieldset>
        <div id="btn-container">
            <button className="bg-softBlack">Crear Proveedor</button>
        </div>
      </form>
    </section>
  );
}

export default CreateSupplierForm