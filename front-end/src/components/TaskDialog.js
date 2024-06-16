import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";

const TaskDialog = ({ open, handleClose, selectedTask, confirmDelete, handleDelete, handleConfirm }) => {
  return (
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
  );
};

export default TaskDialog;
