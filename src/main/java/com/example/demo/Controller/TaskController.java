package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Task;
import com.example.demo.Repository.TaskRepository;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
public class TaskController {
    @Autowired
    TaskRepository taskRepository;

    @GetMapping
    @Operation(summary = "Lista todas as tarefas da lista")
    public ResponseEntity<List<Task>> listAll() {
        try {
            List<Task> taskList = new ArrayList<Task>();
            taskRepository.findAll().forEach(taskList::add);
            if (taskList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(taskList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    @Operation(summary = "Cria uma nova tarefa")
    public Task createTask(@Valid @RequestParam String titulo) {
        Task task = new Task(titulo);
        task.setStatus("pending");
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma tarefa")
    public Task updateTask(long id, String tittle) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setTittle(tittle);
            return taskRepository.save(task);
        }
        return null;
    }

    @PutMapping("/{id}/conclude")
    @Operation(summary = "Conclui uma tarefa")
    public Task concludeTask(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setStatus("completed");
            return taskRepository.save(task);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta uma tarefa")
    public void deleteById(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            taskRepository.deleteById(id);
        }
    }
}