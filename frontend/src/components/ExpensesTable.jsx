import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TextField, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
const columns = [
    { id: 'description', label: 'Description' },
    { id: 'amount', label: 'Amount' },
    { id: 'category', label: 'Category' },
    { id: 'date', label: 'Date' }
];

const ExpensesTable = ({ data, handleDeleteExpense, handleSaveExpense }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('description');
    const [searchTerm, setSearchTerm] = useState("");
    const [sortedFilteredData, setSortedFilteredData] = useState(data);
    const [editingRow, setEditingRow] = useState(null);
    const [page, setPage] = React.useState(1);
    const [itemsPerPage] = useState(10); 

    const handleChangePage = (
        event,
        newPage,
    ) => {
        setPage(newPage);
    };
    useEffect(() => {
        if (data && data.length > 0) {
            const newFilteredData = filterData();
            setSortedFilteredData(sortData(newFilteredData));
        }

    }, [searchTerm, order, orderBy, data]);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleRequestFilter = (e) => {
        setSearchTerm(e.target.value);
    };

    const sortData = (dataToSort) => {
        return [...dataToSort].sort((a, b) => {
            if (orderBy === "amount") {
                const aInt = parseFloat(a[orderBy]);
                const bInt = parseFloat(b[orderBy]);
                return order === 'asc' ? aInt - bInt : bInt - aInt;
            } else {
                if (a[orderBy] < b[orderBy]) {
                    return order === 'asc' ? -1 : 1;
                }
                if (a[orderBy] > b[orderBy]) {
                    return order === 'asc' ? 1 : -1;
                }
            }
            return 0;
        });
    };

    const filterData = () => {
        return data.filter((row) => {
            return Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    };

    const getPaginatedData = () => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedFilteredData.slice(startIndex, endIndex);
    };

    const handleDataChange = (event, columnId) => {
        const { value } = event.target;
        setEditingRow(prev => ({
            ...prev,
            [columnId]: value
        }));

    };
    const handleDelete = async (event, rowId) => {
        event.preventDefault();
        handleDeleteExpense(rowId);
    };
    const handleEdit = async (event, row) => {
        event.preventDefault();
        setEditingRow(row)
        console.log(row)
        // handleEditExpense(row);
    };
    const handleSaveRow = (event) => {
        event.preventDefault();
        handleSaveExpense(editingRow);
        setEditingRow(null);
    };

 const paginatedData = getPaginatedData();
    const totalPages = Math.ceil(sortedFilteredData.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <h1>Expenses Table</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell colSpan={columns.length}>
                                <TextField
                                    label="Search data"
                                    value={searchTerm}
                                    onChange={handleRequestFilter}
                                    fullWidth
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            {columns.map((column, index) => (
                                <TableCell key={index}>
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleRequestSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow data-testid="expensesRow" key={row.id}>
                                {editingRow && editingRow.id === row.id ?
                                    columns.map((column, index) => (column.label !== "" ?
                                        <TableCell key={index}>
                                            <TextField
                                                testId={`${column.label}_Editing`}
                                                label={column.label}
                                                placeholder={row[column.id]}
                                                value={editingRow[column.id] || ''} // Ensure a default empty string if no value
                                                onChange={(event) => handleDataChange(event, column.id)}
                                            >
                                            </TextField>
                                        </TableCell> : "")) :

                                    columns.map((column) => (
                                        <TableCell type={column.id} key={column.id}>
                                            {column.id === "date"
                                                ? row[column.id]
                                                    ? new Date(row[column.id]).toDateString()
                                                    : 'No Date'
                                                : row[column.id]
                                            }
                                        </TableCell>
                                    ))}

                                <TableCell>
                                    <DeleteForeverIcon
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => handleDelete(event, row.id)}
                                    />
                                    {editingRow && editingRow.id === row.id ?
                                        <SaveIcon
                                            style={{ cursor: 'pointer' }}
                                            onClick={(event) => handleSaveRow(event)}>
                                        </SaveIcon> :
                                        <EditIcon
                                            style={{ cursor: 'pointer' }}
                                            onClick={(event) => handleEdit(event, row)}
                                        />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
};

export default ExpensesTable;
