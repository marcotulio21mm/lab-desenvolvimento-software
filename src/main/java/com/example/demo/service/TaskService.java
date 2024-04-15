package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Task;
import com.example.demo.Repository.TaskRepository;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;

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

    public Task createTask(Task task) {
        
        task.setStatus("pending");
        return taskRepository.save(task);
    }

    public Task updateTask(long id, String tittle) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setTittle(tittle);
            return taskRepository.save(task);
        }
        return null;
    }

    public Task concludeTask(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setStatus("completed");
            return taskRepository.save(task);
        }
        return null;
    }

    public void deleteById(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            taskRepository.deleteById(id);
        }
    }

    public List<Task> getAll() {
        return taskRepository.findAll();
    }
}
