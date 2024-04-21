package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.TaskDTO;
import com.example.demo.Entity.Task;
import com.example.demo.service.TaskService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping
    @Operation(summary = "Lista todas as tarefas da lista")
    public ResponseEntity<List<Task>> listAll() {
        return taskService.listAll();
    }

    @PostMapping
    @Operation(summary = "Cria uma nova tarefa")
    public Task createTask(@RequestBody @Valid TaskDTO data) {
        
        return taskService.createTask(data);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma tarefa")
    public Task updateTask(long id, String tittle) {
        return taskService.updateTask(id, tittle);
    }

    @PutMapping("/{id}/conclude")
    @Operation(summary = "Conclui uma tarefa")
    public Task concludeTask(Long id) {
        return taskService.concludeTask(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta uma tarefa")
    public void deleteById(Long id) {
        taskService.deleteById(id);
    }
}