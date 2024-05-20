package com.example.demo.unit;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.DTO.TaskDTO;
import com.example.demo.Entity.Task;
import com.example.demo.Repository.TaskRepository;
import com.example.demo.service.TaskService;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private List<Task> tasks;

    @BeforeEach
    public void setup() {
        tasks = new ArrayList<>();
        Task task1 = new Task();
        task1.setType("data");
        task1.setStatus("pendente");
        task1.setDeadLine(LocalDate.now().plusDays(2));
        tasks.add(task1);

        Task task2 = new Task();
        task2.setType("prazo");
        task2.setStatus("pendente");
        task2.setInsertDate(LocalDate.now());
        task2.setDeadLineDays(5);
        tasks.add(task2);
    }

    // Tests will go here

    @Test
    public void testListAll() {
        when(taskRepository.findAll()).thenReturn(tasks);

        ResponseEntity<List<Task>> response = taskService.listAll();
        List<Task> taskList = response.getBody();

        assertNotNull(taskList);
        assertEquals(2, taskList.size());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("previsto", taskList.get(0).getStatus());
        assertEquals("previsto", taskList.get(1).getStatus());
    }

    @Test
    public void testCreateTask() {
        Task newTask = new Task();
        newTask.setType("data");
        newTask.setStatus("pendente");
        newTask.setDeadLine(LocalDate.now().plusDays(3));

        when(taskRepository.save(any(Task.class))).thenReturn(newTask);

        Task createdTask = taskService.createTask(newTask);

        assertNotNull(createdTask);
        assertEquals("data", createdTask.getType());
        assertEquals("pendente", createdTask.getStatus());
    }

    @Test
    public void testUpdateTask() {
        Task existingTask = tasks.get(0);
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setDeadLine(LocalDate.now().plusDays(5));
        taskDTO.setPriority("alta");
        taskDTO.setStatus("pendente");
        taskDTO.setTittle("Nova Tarefa");
        taskDTO.setType("data");

        when(taskRepository.findById(anyLong())).thenReturn(Optional.of(existingTask));
        when(taskRepository.save(any(Task.class))).thenReturn(existingTask);

        Task updatedTask = taskService.updateTask(1L, taskDTO);

        assertNotNull(updatedTask);
        assertEquals("alta", updatedTask.getPriority());
        assertEquals("Nova Tarefa", updatedTask.getTittle());
    }

    @Test
    public void testConcludeTask() {
        Task existingTask = tasks.get(0);

        when(taskRepository.findById(anyLong())).thenReturn(Optional.of(existingTask));
        when(taskRepository.save(any(Task.class))).thenReturn(existingTask);

        Task concludedTask = taskService.concludeTask(1L);

        assertNotNull(concludedTask);
        assertEquals("concluído", concludedTask.getStatus());
    }

    @Test
    public void testDeleteById() {
        Task existingTask = tasks.get(0);

        when(taskRepository.findById(anyLong())).thenReturn(Optional.of(existingTask));
        doNothing().when(taskRepository).deleteById(anyLong());

        taskService.deleteById(1L);

        verify(taskRepository, times(1)).deleteById(1L);
    }

}
