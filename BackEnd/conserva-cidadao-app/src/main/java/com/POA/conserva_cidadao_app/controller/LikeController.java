package com.POA.conserva_cidadao_app.controller;

import com.POA.conserva_cidadao_app.model.Usuario;
import com.POA.conserva_cidadao_app.repository.UsuarioRepository;
import com.POA.conserva_cidadao_app.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/denuncias/{denunciaId}/like")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @PostMapping("/toggle")
    public ResponseEntity<?> toggleLike(@PathVariable Long denunciaId, @RequestParam Long usuarioId) {
        try {
            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            Map<String, String> resposta = likeService.toggleLike(denunciaId, usuario);

            return ResponseEntity.ok(resposta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("erro", "Erro interno: " + e.getMessage()));
        }
    }


}

