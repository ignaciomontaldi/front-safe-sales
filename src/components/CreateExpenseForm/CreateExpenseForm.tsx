import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import CreateExpenseScheme from '../../schemes/CreateExpenseScheme';
import { CreateExpenseFormData } from '../../types/expenses.types';
import { TbAlertCircle } from 'react-icons/tb';
import './createExpenseForm.css'
import { createExpense } from '../../service/expenses.service';

type CreateExpenseFormParams = {
    setExpenseView: (num : number) => void,
  };

function CreateExpenseForm({setExpenseView} : CreateExpenseFormParams) {

    const {register, handleSubmit, formState: {errors}} = useForm<CreateExpenseFormData>({
        resolver: yupResolver(CreateExpenseScheme)
    })

    const onSubmit = async (data : CreateExpenseFormData) => {
        console.log(data)
        const response = await createExpense(data);
        if(response.ok) {
            setExpenseView(0);
            toast.success('Expensa creada con éxito');
        } else {
            toast.error('Error al crear la expensa');
        }
    }

  return (
    <section id="new-expense-form-container">
      <Toaster richColors visibleToasts={1} />
      <h1 className="text-2xl font-semibold text-softBlack">Nueva Expensa</h1>
      <form id="new-expense-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="name">Nombre de la expensa</label>
          <input type="text" id="name-input" {...register('name')}/>
          {errors && errors?.name && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.name.message}</p>
            </div>}
        </fieldset>
        <fieldset>
          <label htmlFor="type">Tipo</label>
          <input type='text' id="type-input" {...register('type')}/>
          {errors && errors?.type && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.type.message}</p>
            </div>}
        </fieldset>
        <fieldset>
          <label htmlFor="amount">Precio</label>
          <input type="number" id="amount-input" {...register('amount')}/>
          {errors && errors?.amount && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.amount.message}</p>
            </div>}
        </fieldset>
        <div id="btn-container">
            <button className="bg-softBlack">Crear Expensa</button>
        </div>
      </form>
    </section>
  );
}

export default CreateExpenseForm