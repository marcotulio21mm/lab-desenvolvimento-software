import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";

const EditTaskDialog = ({ openEditModal, handleCloseEditModal, taskToEdit, handleEditChange, handleEditSubmit }) => {
  return (
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
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            name="status"
            value={taskToEdit.status}
            onChange={handleEditChange}
          >
            <MenuItem value="pendente">Pendente</MenuItem>
            <MenuItem value="concluido">Concluído</MenuItem>
          </Select>
        </FormControl>
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
  );
};

export default EditTaskDialog;
