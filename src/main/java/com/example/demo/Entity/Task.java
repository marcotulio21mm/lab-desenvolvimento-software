package com.example.demo.Entity;

import java.time.LocalDate;
import java.util.Date;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Schema(description = "Todos os detalhes sobre uma tarefa")
@Table(name = "tasks")

public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @NotBlank(message = "Título não pode ser vazio")
    @Column(nullable = false)
    private String tittle;

    @Column(nullable = true)
    private String status;

    @Column(nullable = true)
    private String type;

    @Column(nullable = true)
    private String priority;

    @Column(nullable = true)
    private LocalDate deadLine; // prazo

    @Column(nullable = true)
    private LocalDate insertDate;

    @Column(nullable = true)
    private Integer deadLineDays;

    public Task() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTittle() {
        return this.tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public void setInsertDate(LocalDate insertDate) {
        this.insertDate = insertDate;
    }

    public LocalDate getInsertDate() {
        return this.insertDate;
    }

    public void setDeadLineDays(Integer deadLineDays){
        this.deadLineDays = deadLineDays;
    }

    public Integer getDeadLineDays(){
        return this.deadLineDays;
    }

    @Override
    public String toString() {
        return "Task [id=" + id + ", tittle=" + tittle + ", status=" +
                status + "]";
    }

}