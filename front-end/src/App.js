import React, { useState} from 'react';
import { Box, Container } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import TaskDialog from './components/TaskDialog';
import EditTaskDialog from './components/EditTaskDialog';

const App = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [age, setAge] = useState("");
  const [dataEsperada, setDataEsperada] = useState("");
  const [diasPrevisto, setDiasPrevisto] = useState("");
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({
    id: '',
    tittle: '',
    priority: '',
    status: '',
    type: '',
    deadLine: '',
    deadLineDays: '',
  });

  const handleAddTarefa = () => {
    const newTask = {
      id: uuidv4(),
      tittle: title,
      priority: priority,
      status: 'pendente',
      type: age,
      deadLine: dataEsperada,
      deadLineDays: diasPrevisto,
    };
    setRows([...rows, newTask]);
    setTitle('');
    setPriority('');
    setAge('');
    setDataEsperada('');
    setDiasPrevisto('');
  };

  const handleConfirm = (task) => {
    setRows(rows.map(t => t.id === task.id ? { ...t, status: 'concluido' } : t));
    handleClose();
  };

  const handleOpenDeleteDialog = (task) => {
    setSelectedTask(task);
    setConfirmDelete(true);
    setOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setTaskToEdit({ ...taskToEdit, [name]: value });
  };

  const handleEditSubmit = () => {
    setRows(rows.map(t => t.id === taskToEdit.id ? taskToEdit : t));
    handleCloseEditModal();
  };

  const handleDelete = () => {
    setRows(rows.filter(t => t.id !== selectedTask.id));
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{textAlign: "center"}}>
      <h2>Lista de tarefas</h2>
      <Container>
        <TaskForm
          title={title}
          setTitle={setTitle}
          priority={priority}
          setPriority={setPriority}
          age={age}
          setAge={setAge}
          dataEsperada={dataEsperada}
          setDataEsperada={setDataEsperada}
          diasPrevisto={diasPrevisto}
          setDiasPrevisto={setDiasPrevisto}
          handleAddTarefa={handleAddTarefa}
        />
        <TaskTable
          rows={rows}
          handleOpenEditModal={handleOpenEditModal}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          handleConfirm={handleConfirm}
        />
        <TaskDialog
          open={open}
          handleClose={handleClose}
          selectedTask={selectedTask}
          confirmDelete={confirmDelete}
          handleDelete={handleDelete}
          handleConfirm={handleConfirm}
        />
        <EditTaskDialog
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
          taskToEdit={taskToEdit}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
        />
      </Container>
    </Box>
  );
};

export default App;
