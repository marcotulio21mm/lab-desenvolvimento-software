package com.example.demo.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.TaskDTO;
import com.example.demo.Entity.Task;
import com.example.demo.Repository.TaskRepository;

import jakarta.transaction.Transactional;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;

    public ResponseEntity<List<Task>> listAll() {
        try {
            List<Task> taskList = new ArrayList<>();
            taskRepository.findAll().forEach(taskList::add);

            if (taskList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            LocalDate today = LocalDate.now();

            for (Task task : taskList) {
                String type = task.getType();
                String status = task.getStatus();
                LocalDate deadline = null;

                if ("data".equals(type)) {
                    deadline = task.getDeadLine();
                } else if ("prazo".equals(type)) {
                    long deadlineDays = task.getDeadLineDays();
                    LocalDate insertDate = task.getInsertDate();
                    deadline = insertDate.plusDays(deadlineDays);
                }

                if (deadline != null) {
                    if ("concluído".equals(status)) {
                        task.setStatus("concluído");
                    } else if (deadline.isAfter(today)) {
                        long daysUntilDeadline = ChronoUnit.DAYS.between(today, deadline);
                        task.setStatus("previsto");
                    } else {
                        long daysOverdue = ChronoUnit.DAYS.between(deadline, today);
                        task.setStatus(daysOverdue + " dias de atraso");
                    }
                }
            }

            return new ResponseEntity<>(taskList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public Task createTask(TaskDTO data) {
        Task task = new Task();
        task.setDeadLine(data.getDeadLine());
        task.setPriority(data.getPriority());
        task.setStatus(data.getStatus());
        task.setTittle(data.getTittle());
        task.setType(data.getType());
        task.setInsertDate(LocalDate.now());
        task.setDeadLineDays(data.getDeadLineDays());
        return taskRepository.save(task);
    }

    public Task updateTask(long id, TaskDTO data) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setDeadLine(data.getDeadLine());
            task.setPriority(data.getPriority());
            task.setStatus(data.getStatus());
            task.setTittle(data.getTittle());
            task.setType(data.getType());
            return taskRepository.save(task);
        }
        return null;
    }

    public Task concludeTask(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setStatus("concluído");
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
