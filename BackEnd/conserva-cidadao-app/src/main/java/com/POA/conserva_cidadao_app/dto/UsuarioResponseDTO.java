package com.POA.conserva_cidadao_app.dto;

public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String role;

    public UsuarioResponseDTO(Long id, String nome, String role) {
        this.id = id;
        this.nome = nome;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getRole() {
        return role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
