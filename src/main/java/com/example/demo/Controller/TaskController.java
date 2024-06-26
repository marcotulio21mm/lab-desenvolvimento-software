package com.example.demo.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.TaskDTO;
import com.example.demo.Entity.Task;
import com.example.demo.service.TaskService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@CrossOrigin
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
    public Task updateTask(@PathVariable long id, @RequestBody @Valid TaskDTO data) {
        return taskService.updateTask(id, data);
    }

    @PutMapping("/{id}/conclude")
    @Operation(summary = "Conclui uma tarefa")
    public Task concludeTask(@PathVariable Long id) {
        return taskService.concludeTask(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta uma tarefa")
    public void deleteById(@PathVariable Long id) {
        taskService.deleteById(id);
    }
}
