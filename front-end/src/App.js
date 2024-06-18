import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import axios from 'axios';
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

  useEffect(() => {
    axios.get('http://localhost:8080/tasks')
      .then(response => setRows(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTarefa = () => {
    const newTask = {
      tittle: title,
      priority: priority,
      status: 'pendente',
      type: age,
      deadLine: dataEsperada,
      deadLineDays: diasPrevisto,
    };

    axios.post('http://localhost:8080/tasks', newTask)
      .then(response => {
        setRows([...rows, response.data]);
        setTitle('');
        setPriority('');
        setAge('');
        setDataEsperada('');
        setDiasPrevisto('');
      })
      .catch(error => console.error('Error creating task:', error));
  };

  const handleConfirm = (task) => {
    axios.put(`http://localhost:8080/tasks/${task.id}/conclude`)
      .then(response => {
        setRows(rows.map(t => t.id === task.id ? response.data : t));
        handleClose();
      })
      .catch(error => console.error('Error concluding task:', error));
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
    axios.put(`http://localhost:8080/tasks/${taskToEdit.id}`, taskToEdit)
      .then(response => {
        setRows(rows.map(t => t.id === taskToEdit.id ? response.data : t));
        handleCloseEditModal();
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/tasks/${selectedTask.id}`)
      .then(() => {
        setRows(rows.filter(t => t.id !== selectedTask.id));
        handleClose();
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <h2>To-do List</h2>
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
