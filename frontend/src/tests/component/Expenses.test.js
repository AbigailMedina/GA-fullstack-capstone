import React, { act } from 'react';
import { render, screen, fireEvent, waitFor , within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Expenses from '../../components/Expenses';
// import { fetchExpenses, addExpense, deleteExpense, editExpense } from '../../services/api';


const mockExpenses=[{ id: 2, description: 'Rent', amount: 500, category: 'Housing', date:"05/15/2024" }];
const mockExpenses_newExpense = { id: 1, description: 'Utilities', amount: 100, category: 'Bills', date:"05/15/2024" };
const mockExpenses_DeleteExpense = { id: 2, description: 'Rent', amount: 500, category: 'Housing', date:"05/15/2024" };

describe('Expenses Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url, options) => {
      console.log("here1")
    
      // Default response for `GET` requests
      if (!options || options.method === 'GET') {
        console.log("here2")
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(mockExpenses),
        });
      }
      if (!options || options.method === 'POST') {
        console.log("here3")
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(mockExpenses_newExpense),
        });
      } 
      // Mock response for `DELETE` requests
      if (options && options.method === 'DELETE') {
        console.log("here4")
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(mockExpenses_DeleteExpense),

        });
      }
    
      // Default response for unknown URLs or methods
      return Promise.reject(new Error('Unknown API call'));
    });
  });

  test('renders the component and its elements', async () => {
    render(<Expenses />);

    expect(screen.getByText(/Add an expense/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Expense/i)).toBeInTheDocument();
  });

  test('fetches and displays expenses on mount', async () => {
    render(<Expenses />);
    
    await waitFor(()=>{
       const initialRows = screen.queryAllByTestId('expensesRow');
       const numRowsBefore = initialRows.length;
       expect(numRowsBefore).toBe(mockExpenses.length)
    })
  });

  test('adds a new expense', async () => {    
    render(<Expenses />);

    let numRowsBefore;
    await waitFor(()=>{
      numRowsBefore = screen.queryAllByTestId('expensesRow').length;
    })

    await waitFor(() => expect(screen.getByText(/Add Expense/i)).toBeInTheDocument());

    const desc = screen.getByLabelText(/Description/i);
    const amount = screen.getByLabelText(/Amount/i);
    const category = screen.getByLabelText(/Category/i);
    const date = document.querySelector('input[type="date"]');
    // screen.getByRole('textbox', { name: /date/i });
    //within(screen.getByTestId("dateinput")).getByRole("textbox");
    await userEvent.type(desc, mockExpenses_newExpense.description);
    await userEvent.type(amount, mockExpenses_newExpense.amount.toString());
    await userEvent.type(category, mockExpenses_newExpense.category);
    await userEvent.type(date, mockExpenses_newExpense.date);

    await act(()=>{
      fireEvent.click(screen.getByTestId('add-expense'));
    })
    await waitFor(() => {
      expect(screen.getByText(mockExpenses_newExpense.category)).toBeInTheDocument();
    });
    const updatedRows = screen.queryAllByTestId('expensesRow');
    const numRowsAfter = updatedRows.length;
    expect(numRowsAfter).toBeGreaterThan(numRowsBefore);
  });

  test.skip('deletes an expense', async () => {
    render(<Expenses />);
    let numRowsBefore;
    await waitFor(()=>{
      numRowsBefore = screen.queryAllByTestId('expensesRow').length;
    })
    await waitFor(() => {
      expect(screen.getByText(/Housing/i)).toBeInTheDocument();
      console.log("screen.queryAllByTestId('expensesRow').length",screen.queryAllByTestId('expensesRow').length)

      expect(screen.queryAllByTestId('expensesRow').length).toBe(1);
    });

    await act(()=>{
      fireEvent.click(screen.getByTestId('DeleteForeverIcon'));
    })
   
    await waitFor(() => {
      console.log("screen.queryAllByTestId('expensesRow').length",screen.queryAllByTestId('expensesRow').length)
      expect(screen.queryAllByTestId('expensesRow').length).toBe(0);

      expect(screen.queryByText(/Housing/i)).not.toBeInTheDocument();

    });
   
    const updatedRows = screen.queryAllByTestId('expensesRow');
    const numRowsAfter = updatedRows.length;
    expect(numRowsAfter).toBeLessThan(numRowsBefore)
  });

  test.skip('edits an expense', async () => {
    // Mock API response
    const initialExpenses = [{ id: 1, description: 'Groceries', amount: 50, category: 'Food' , date:'05/15/2024'}];
    const updatedExpense = { id: 1, description: 'Groceries', amount: 60, category: 'Food' , date:'05/15/2024'};
    fetchExpenses.mockResolvedValue(initialExpenses);
    editExpense.mockResolvedValue(updatedExpense);
    fetchExpenses.mockResolvedValue([updatedExpense]);

    // await act(async () => {
    render(<Expenses />);

    // Wait for initial expense to be displayed
    await expect(screen.getByText(/Groceries/i)).toBeInTheDocument();


    // Trigger edit (ensure these IDs and actions match your implementation)
    fireEvent.click(screen.getByTestId("EditIcon")); // Adjust according to your implementation

    // Update expense amount
    fireEvent.change(screen.getByTestId("Amount_Editing"), { target: { value: '60' } });

    // Save changes
    fireEvent.click(screen.getByTestId("SaveIcon")); // Adjust according to your implementation

    // Wait for the updated expense to be displayed
    await expect(screen.getByText(/60/i)).toBeInTheDocument();

  });
  afterEach(()=>{
    jest.resetAllMocks();
  })
});
