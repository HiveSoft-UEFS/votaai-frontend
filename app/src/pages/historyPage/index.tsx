
import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SideMenu from '../../components/sideMenu';
import PageTitle from '../../components/pageTitle';
import Paper from '@mui/material/Paper';
import './History.css';
import BasePage from '../../components/basePage';


interface Column {
    id: 'status' | 'codigo' | 'data' | 'horario' | 'enquete' | 'origem';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'status', label: 'Status', minWidth: 50, align: 'center'},
    { id: 'codigo', label: 'Codigo', minWidth: 100, align: 'center'},
    {
        id: 'data',
        label: 'Data',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'horario',
        label: 'Horário',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'enquete',
        label: 'Enquete',
        minWidth: 300,
        align: 'center',
    },
    {
        id: 'origem',
        label: 'Origem',
        minWidth: 100,
        align: 'center',
    },
];

interface Data {
    status: string;
    codigo: string;
    data: string;
    horario: string;
    enquete: string;
    origem: string;
}



function createData(
    status: string,
    codigo: string,
    data: string,
    horario: string,
    enquete: string,
    origem: string,
): Data {

    return { status, codigo, data, horario, enquete, origem};
}


function getStatusColor(status: any) {
    switch (status) {
        case 'finalizada':
            return 'red';
        case 'andamento':
            return '#13ff03';
        case 'arquivada':
            return 'yellow';
    }
}

const rows = [
    createData('finalizada', 'PRV4890', '01/02/2023', '13:30', 'A Capital do Brazil mais Votada nas últimas ...', 'Criada'),
    createData('andamento', 'PUB4890', '02/02/2023', '11:29', 'Barco navegado pelos tripulantes vindo da Bahia ', 'Participada'),
    createData('arquivada', 'PRV4890', '02/02/2023', '23:14', 'Como o Planalto dexou passar a lei 15.201/2023', 'Participada'),
    createData('andamento', 'PRV4890', '04/02/2023', '10:49', 'Direitos constituintes dos povos indígenas.', 'Criada'),
];





const History = () => {
    const [filter, setFilter] = React.useState<string | number>('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const filteredData = rows.filter((row) => {
        if (filter === '') {
            return true;
        } else if (filter === 1) {
            return row.status === 'finalizada';
        } else if (filter === 2) {
            return row.status === 'andamento';
        } else if (filter === 3) {
            return row.status === 'arquivada';
        } else if (filter === 4) {
            return row.origem === 'Criada';
        } else if (filter === 5) {
            return row.origem === 'Participada';
        }
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return (
        <div className=''>
            <BasePage username='Usuario' title='Historico'>

                <div className='description'>
                    <div style={{ display: 'flex', margin: '0 10px'}}>
                        <div style={{ backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px' }}></div>
                        <span className="spans" style={{ fontSize: '20px', margin: '0 2px', color: "white" }}>Finalizada</span>
                    </div>

                    <div style={{ display: 'flex', margin: '0 10px'}}>
                        <div style={{ backgroundColor: '#13ff03', borderRadius: '50%', width: '20px', height: '20px'}}></div>
                        <span className="spans" style={{ fontSize: '20px', margin: '0 2px', color: 'white' }}>Andamento</span>
                    </div>

                    <div style={{ display: 'flex', margin: '0 10px' }}>
                        <div style={{ backgroundColor: 'yellow',borderRadius: '50%', width: '20px', height: '20px' }}></div>
                        <span className="spans" style={{fontSize: '20px', margin: '0 2px', color: 'white' }}>Arquivada</span>
                    </div>


                    <FormControl sx={{ m: 1, minWidth: 200, marginLeft: '200px', backgroundColor: 'white', borderRadius: '8px'}}>
                        <InputLabel id="demo-controlled-open-select-label">Filtro</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={filter}
                            label="Filtro"
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <MenuItem value=''>
                                <em>Nenhum</em>
                            </MenuItem>
                            <MenuItem value={1}>Finalizadas</MenuItem>
                            <MenuItem value={2}>Em Andamento</MenuItem>
                            <MenuItem value={3}>Arquivadas</MenuItem>
                            <MenuItem value={4}>Criada</MenuItem>
                            <MenuItem value={5}>Participada</MenuItem>
                        </Select>
                    </FormControl>
                </div>



                <div className='table' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Paper sx={{ width: '80%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 300}} className='table-container' >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {filteredData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.codigo}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.id === 'status' ? (
                                                                    <div style={{
                                                                        height: '20px',
                                                                        width: '20px',
                                                                        backgroundColor: getStatusColor(value), // A cor é baseada no valor da célula 'status'
                                                                        borderRadius: '50%',
                                                                        display: 'inline-block'
                                                                    }} />
                                                                ) : (
                                                                    column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </BasePage>
        </div>
    );
};

export default History;
