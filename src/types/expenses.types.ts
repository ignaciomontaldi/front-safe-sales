export type Expenses = {
    id:        string;
    name:      string;
    type:      string;
    status:    string;
    amount:    number;
    createdAt: string;
    paidAt:    string;
}

export type CreateExpenseFormData = {
    name:      string;
    type:      string;
    amount:    number;
}
