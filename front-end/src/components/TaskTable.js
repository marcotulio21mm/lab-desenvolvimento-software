import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  styled,
  tableCellClasses
} from "@mui/material";
import { Icon } from "@iconify/react";
import dayjs from 'dayjs';

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

const TaskTable = ({ rows, handleOpenEditModal, handleOpenDeleteDialog, handleConfirm }) => {
  const calculateDeliveryDate = (task) => {
    if (task.type === 'prazo') {
      return dayjs().add(task.deadLineDays, 'day').format('DD/MM/YYYY');
    } else if (task.type === 'data') {
      return dayjs(task.deadLine).format('DD/MM/YYYY');
    } else {
      return 'N/A';
    }
  };

  return (
    <TableContainer component={Table}>
      <Table sx={{ minWidth: 650, marginTop: "2rem" }} aria-label="simple table">
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
  );
};

export default TaskTable;
