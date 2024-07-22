
import React, {useEffect, useState, ChangeEvent} from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SideMenu from '../../components/sideMenu';
import PageTitle from '../../components/pageTitle';
import Paper from '@mui/material/Paper';
import './History.css';
import BasePage from '../../components/basePage';
import { getUserPollHistory } from '../../services/pollServices';

interface Column {
    id: 'status' | 'data_criacao' | 'titulo' | 'tipo';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'status', label: 'Status', minWidth: 50, align: 'center' },
    { id: 'data_criacao', label: 'Data de Criação', minWidth: 100, align: 'center' },
    { id: 'titulo', label: 'Enquete', minWidth: 300, align: 'center' },
    { id: 'tipo', label: 'Origem', minWidth: 100, align: 'center' },
];

interface PollData {
    username: string;
    status: string;
    data_criacao: string;
    titulo: string;
    tipo: string;
}


const History = () => {
    const [pollData, setPollData] = useState<PollData[]>([]);
    const [filter, setFilter] = useState<string | number>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const [userPollHistory, setUserPollHistory] = useState<{ username: string }>({ username: '' }); // Inicialize com um objeto contendo username



    // Função para lidar com alterações nos dados
    const handleChange = (e: ChangeEvent<HTMLInputElement>, rowIndex: number, key: keyof PollData) => {
        const newData = [...pollData];
        newData[rowIndex][key] = e.target.value; // Aqui TypeScript sabe que key é uma chave válida de PollData
        setPollData(newData);
    };
    

    useEffect(() => {
        fetchPollHistory(); // Chamada inicial para carregar os dados do histórico de enquetes
    }, []);

    // Função para buscar e atualizar os dados do histórico de enquetes
    const fetchPollHistory = async () => {
        try {
            const data = await getUserPollHistory();
            setPollData(data.polls);
            // Defina o username no estado userPollHistory
            setUserPollHistory({ username: data.polls[0]?.username || '' });
        } catch (error) {
            console.error('Error fetching poll history:', error);
            setPollData([]); // Definindo como array vazio em caso de erro para evitar problemas
        }
    };

    

    const getStatusColor = (status: string | undefined): string => {
        switch (status) {
            case 'CLOSED':
                return 'red';
            case 'OPEN':
                return '#13ff03';
            case 'ARCHIVED':
                return 'yellow';
            default:
                return 'black'; // Cor padrão para outros status não especificados
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredData = pollData.filter((row) => {
        if (filter === '') {
            return true;
        } else if (filter === 1) {
            return row.status === 'CLOSED';
        } else if (filter === 2) {
            return row.status === 'OPEN';
        } else if (filter === 3) {
            return row.status === 'ARCHIVED';
        } else if (filter === 4) {
            return row.tipo === 'Criada';
        } else if (filter === 5) {
            return row.tipo === 'Participada';
        }
    });

    return (
        <div className=''>
            <BasePage username={userPollHistory.username} title='Historico'>
                <div className='description'>
                    <div style={{ display: 'flex', margin: '0 10px' }}>
                        <div style={{ backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px' }}></div>
                        <span className="spans" style={{ fontSize: '20px', margin: '0 2px', color: "white" }}>Finalizada</span>
                    </div>

                    <div style={{ display: 'flex', margin: '0 10px' }}>
                        <div style={{ backgroundColor: '#13ff03', borderRadius: '50%', width: '20px', height: '20px' }}></div>
                        <span className="spans" style={{ fontSize: '20px', margin: '0 2px', color: 'white' }}>Andamento</span>
                    </div>

                    <div style={{ display: 'flex', margin: '0 10px' }}>
                        <div style={{ backgroundColor: 'yellow', borderRadius: '50%', width: '20px', height: '20px' }}></div>
                        <span className="spans" style={{ fontSize: '20px', margin: '0 2px', color: 'white' }}>Arquivada</span>
                    </div>

                    <FormControl sx={{ m: 1, minWidth: 200, marginLeft: '200px', backgroundColor: 'white', borderRadius: '8px' }}>
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

                <div className='table' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper sx={{ width: '80%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 300 }} className='table-container'>
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
                                <TableBody>
                                    {filteredData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, rowIndex) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.titulo}>
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
                                                                    <input
                                                                    type="text"
                                                                    value={value}
                                                                    onChange={(e) => handleChange(e, rowIndex, column.id as keyof PollData)}
                                                                    style={{ width: '100%', border: 'none', textAlign: 'center' }}
                                                                    />
                                                                    /*column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value*/
                                                                        
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
                            count={pollData.length}
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

