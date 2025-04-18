import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditField } from "../../hooks/useEditField";
import { TbAlertCircle } from "react-icons/tb";
import { toast } from "sonner";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { useLoading } from "../../hooks/useLoading";
import { Expenses } from "../../types/expenses.types";
import { EditExpenseScheme } from "../../schemes/EditExpenseScheme";
import { EditExpenseFormData } from "../../types/forms.types";
import "./editExpenseForm.css";
import { updateExpense } from "../../service/expenses.service";

type EditExpenseFormParams = {
    expense: Expenses;
    setEditExpense: (expense : Expenses | null) => void;
    setExpenseView: (view : number) => void;
};

function EditExpenseForm({
  expense,
  setEditExpense,
  setExpenseView
}: EditExpenseFormParams) {
  const { setChange } = useEditField();
  const {load, setLoad} = useLoading()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditExpenseFormData>({
    resolver: yupResolver(EditExpenseScheme),
    defaultValues: {
      id: expense.id,
    },
  });

  const onSubmit = async (data : EditExpenseFormData) => {
    const response = await updateExpense(data);
        if(response.ok) {
          toast.success("Expensa actualizada con éxito");
          setEditExpense(null);
          setExpenseView(0);
          setChange(false);
        } else {
          toast.error("Error al actualizar la expensa. Intente nuevamente");
        }
  };

  const cancelEdit = () => {
    setEditExpense(null);
    setExpenseView(0);
    setChange(false);
  };

  useEffect(() => {
      setLoad(true);
      if (!expense) {
        setExpenseView(0);
      }
      setLoad(false);
  }, [expense, setExpenseView, setLoad]);

  return (
    <>
      {expense && (
        <>
          <h1 className="my-2 text-2xl font-bold text-softBlack">
            Actualizar Cliente
          </h1>
          <Loading message="Cargando datos del cliente..."/>
          {!load && <>
            <form id="edit-client-form" onSubmit={handleSubmit(onSubmit)}>
            <div id="form-group">
              <label htmlFor="name">Nombre de la expensa</label>
              <input
                type="text"
                id="name"
                defaultValue={expense.name}
                {...register("name")}
              />
              {errors && errors?.name && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.name.message}</p>
              </div>}
            </div>
            <div id="form-group">
              <label htmlFor="type">Tipo</label>
              <input
                type="text"
                id="type"
                defaultValue={expense.type}
                {...register("type")}
              />
              {errors && errors.type && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.type.message}</p>
              </div>}
            </div>
            <div id="form-group">
              <label htmlFor="amount">Precio</label>
              <input
                type="number"
                id="amount"
                defaultValue={expense.amount}
                {...register("amount")}
              />
              {errors && errors.amount && <div id="error-container">
                <TbAlertCircle />
                <p id="error-msg">{errors.amount.message}</p>
              </div>}
            </div>
            <div id="btn-container">
              <button type="submit" id="edit-btn">
                Actualizar Expensa
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

export default EditExpenseForm;
