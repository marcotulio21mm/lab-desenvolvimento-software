package com.example.demo.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TaskDTO {

    private Long id;
    @NotBlank
    private String tittle;
    private String type;
    private String priority;
    private LocalDate deadLine;
    private String status;
    private LocalDate insertDate;
    private Long deadLineDays;  // Corrigido para Long

    // Getters and Setters

    public Long getId() {
        return this.id;
    }

    public void setTittle(Long id) {
        this.id = id;
    }

    public String getTittle() {
        return this.tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPriority() {
        return this.priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDate getDeadLine() {
        return this.deadLine;
    }

    public void setDeadLine(LocalDate deadLine) {
        this.deadLine = deadLine;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getInsertDate() {
        return this.insertDate;
    }

    public void setInsertDate(LocalDate insertDate) {
        this.insertDate = insertDate;
    }

    public Long getDeadLineDays() {
        return this.deadLineDays;
    }

    public void setDeadLineDays(Long deadLineDays) {
        this.deadLineDays = deadLineDays;
    }
}
