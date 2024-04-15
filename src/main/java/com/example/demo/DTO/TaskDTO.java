package com.example.demo.DTO;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.NotBlank;

public class TaskDTO {
    
    @NotBlank
    private String tittle;
    @Nullable
    private String type;
    @Nullable
    private String priority;
    @Nullable
    private String deadLine;
    @Nullable
    private String status;


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

    public String getDeadLine() {
        return this.deadLine;
    }

    public void setDeadLine(String deadLine) {
        this.deadLine = deadLine;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
