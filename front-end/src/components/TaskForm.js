import React from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";

const TaskForm = ({
  title,
  setTitle,
  priority,
  setPriority,
  age,
  setAge,
  dataEsperada,
  setDataEsperada,
  diasPrevisto,
  setDiasPrevisto,
  handleAddTarefa
}) => {
  return (
    <Grid container md={12} spacing={1} sx={{ width: "80%", display: "flex", marginLeft: "auto", marginRight: "auto", marginTop: "auto" }}>
      <Grid item xs={3} sx={{ marginLeft: "2rem" }}>
        <TextField
          id="outlined-basic"
          label="Título"
          variant="outlined"
          fullWidth
          size='small'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setPriority(e.target.value)}
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
            label="Data tarefa"
            onChange={(e) => setAge(e.target.value)}
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
            onChange={(e) => setDataEsperada(e.target.value)}
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
            onChange={(e) => setDiasPrevisto(e.target.value)}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default TaskForm;
