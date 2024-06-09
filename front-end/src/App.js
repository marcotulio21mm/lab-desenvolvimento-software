import './App.css';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  styled,
  tableCellClasses
} from "@mui/material";
import Select from '@mui/material/Select';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import dayjs from 'dayjs';

function App() {
  const [age, setAge] = useState('livre');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dataEsperada, setDataEsperada] = useState('');
  const [diasPrevisto, setDiasPrevisto] = useState('');
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({
    id: null,
    tittle: '',
    type: '',
    priority: '',
    deadLine: '',
    insertDate: '',
    deadLineDays: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/tasks')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleDataEsperadaChange = (event) => {
    setDataEsperada(event.target.value);
  };

  const handleDiasPrevistoChange = (event) => {
    setDiasPrevisto(event.target.value);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setTaskToEdit({
      id: null,
      tittle: '',
      type: '',
      priority: '',
      deadLine: '',
      insertDate: '',
      deadLineDays: ''
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setTaskToEdit({ ...taskToEdit, [name]: value });
  };

  const handleEditSubmit = () => {

    axios.put(`http://localhost:8080/tasks/${taskToEdit.id}`, taskToEdit)
      .then(response => {
        setRows(rows.map(row => (row.id === taskToEdit.id ? response.data : row)));
        handleCloseEditModal();
      })
      .catch(error => {
        console.error('Erro ao atualizar tarefa!', error);
      });
  };

  const handleConfirm = (task) => {
    setSelectedTask(task);
    if (task) {
      axios.put(`http://localhost:8080/tasks/${task.id}/conclude`)
        .then(response => {
          setRows(rows.map(row => (row.id === task.id ? response.data : row)));
          handleClose();
        })
        .catch(error => {
          console.error('Erro ao concluir a tarefa!', error);
        });
    }
  };

  const handleDelete = () => {
    if (selectedTask) {
      axios.delete(`http://localhost:8080/tasks/${selectedTask.id}`)
        .then(response => {
          setRows(rows.filter(row => row.id !== selectedTask.id));
          handleClose();
        })
        .catch(error => {
          console.error('Erro ao excluir tarefa!', error);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
    setConfirmDelete(false);
  };

  const handleOpenDeleteDialog = (task) => {
    setSelectedTask(task);
    setConfirmDelete(true);
    setOpen(true);
  };

  const handleAddTarefa = () => {
    let endpoint = 'http://localhost:8080/tasks';
    const newTask = {
      tittle: title,
      type: age,
      priority: priority,
      status: 'pendente',
      deadLine: '',
      deadLineDays: ''
    };

    if (age === 'data') {
      newTask.deadLine = dataEsperada;
    } else if (age === 'prazo') {
      newTask.deadLineDays = diasPrevisto;
    }

    axios.post(endpoint, newTask)
      .then(response => {
        setRows([...rows, response.data]);
        setTitle('');
        setAge('livre');
        setPriority('');
        setDataEsperada('');
        setDiasPrevisto('');
      })
      .catch(error => {
        console.error('Erro ao adicionar tarefa!', error);
      });
  };

  const calculateDeliveryDate = (task) => {
    if (task.type === 'prazo') {
      return dayjs().add(task.deadLineDays, 'day').format('DD/MM/YYYY');
    } else if (task.type === 'data') {
      return dayjs(task.deadLine).format('DD/MM/YYYY');
    } else {
      return 'N/A';
    }
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <div className="App" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>Lista de Tarefas</h1>
      <Grid container md={12} spacing={1} sx={{ width: "80%", display: "flex", marginLeft: "auto", marginRight: "auto", marginTop: "auto" }}>
        <Grid item xs={3} sx={{ marginLeft: "2rem" }}>
          <TextField
            id="outlined-basic"
            label="Título"
            variant="outlined"
            fullWidth
            size='small'
            value={title}
            onChange={handleTitleChange}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="priority-select-label">Prioridade</InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              value={priority}
              size="small"
              label="Prioridade"
              onChange={handlePriorityChange}
            >
              <MenuItem value="baixa">Baixa</MenuItem>
              <MenuItem value="media">Média</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo tarefa</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              size="small"
              defaultValue='livre'
              label="Data tarefa"
              onChange={handleChange}
            >
              <MenuItem value="livre">Livre</MenuItem>
              <MenuItem value="data">Data</MenuItem>
              <MenuItem value="prazo">Prazo em dias</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} fullWidth sx={{ textAlign: "center" }}>
          <Button variant="contained" onClick={handleAddTarefa}>Salvar</Button>
        </Grid>

        {age === 'data' && (
          <Grid item xs={4}>
            <TextField
              id="data-esperada"
              label="Data Esperada"
              type="date"
              size='small'
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={dataEsperada}
              onChange={handleDataEsperadaChange}
            />
          </Grid>
        )}

        {age === 'prazo' && (
          <Grid item xs={4}>
            <TextField
              id="dias-previsto"
              label="Dias Previsto"
              fullWidth
              size='small'
              type="number"
              value={diasPrevisto}
              onChange={handleDiasPrevistoChange}
            />
          </Grid>
        )}
      </Grid>
      <Container sx={{ marginTop: "2rem" }}>
        <TableContainer component={Table}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Título</StyledTableCell>
                <StyledTableCell align="left">Prioridade</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Tipo</StyledTableCell>
                <StyledTableCell align="left">Data de Entrega</StyledTableCell>
                <StyledTableCell align="left">Ações</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <TableCell align="left">{row.tittle}</TableCell>
                  <TableCell align="left">{row.priority}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">{calculateDeliveryDate(row)}</TableCell>
                  <TableCell align="left">
                    <IconButton onClick={() => handleOpenEditModal(row)}>
                      <Icon color='grey' icon={"lucide:edit"} />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteDialog(row)}>
                      <Icon color='red' icon={"mdi:trash"} />
                    </IconButton>
                    {row.status !== "concluido" && (
                      <IconButton onClick={() => handleConfirm(row)}>
                        <Icon color='blue' icon={"line-md:confirm-circle"} />
                      </IconButton>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {confirmDelete ? "Confirmar Exclusão de Tarefa" : "Confirmar Conclusão de Tarefa"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmDelete
              ? `Você tem certeza que deseja excluir a tarefa "${selectedTask?.tittle}"?`
              : `Você tem certeza que deseja marcar a tarefa "${selectedTask?.tittle}" como concluída?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={confirmDelete ? handleDelete : () => handleConfirm(selectedTask)} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar Tarefa</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="tittle"
            label="Título"
            type="text"
            fullWidth
            value={taskToEdit.tittle}
            onChange={handleEditChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="priority-select-label">Prioridade</InputLabel>
            <Select
              labelId="priority-select-label"
              name="priority"
              value={taskToEdit.priority}
              onChange={handleEditChange}
            >
              <MenuItem value="baixa">Baixa</MenuItem>
              <MenuItem value="media">Média</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="type-select-label">Tipo tarefa</InputLabel>
            <Select
              labelId="type-select-label"
              name="type"
              value={taskToEdit.type}
              onChange={handleEditChange}
            >
              <MenuItem value="livre">Livre</MenuItem>
              <MenuItem value="data">Data</MenuItem>
              <MenuItem value="prazo">Prazo em dias</MenuItem>
            </Select>
          </FormControl>
          {taskToEdit.type === 'data' && (
            <TextField
              margin="dense"
              name="deadLine"
              label="Data de Inserção"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={taskToEdit.deadLine}
              onChange={handleEditChange}
            />
          )}
          {taskToEdit.type === 'prazo' && (
            <TextField
              margin="dense"
              name="deadLineDays"
              label="Dias de Prazo"
              type="number"
              fullWidth
              value={taskToEdit.deadLineDays}
              onChange={handleEditChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
