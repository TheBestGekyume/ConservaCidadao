package com.POA.conserva_cidadao_app.service;

import com.POA.conserva_cidadao_app.model.Like;
import com.POA.conserva_cidadao_app.model.Denuncia;
import com.POA.conserva_cidadao_app.repository.LikeRepository;
import com.POA.conserva_cidadao_app.repository.DenunciaRepository;
import com.POA.conserva_cidadao_app.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private DenunciaRepository denunciaRepository;

    public Map<String, String> toggleLike(Long denunciaId, Usuario usuario) {
        Optional<Like> existente = likeRepository.findByUsuarioIdAndDenunciaId(usuario.getId(), denunciaId);

        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                .orElseThrow(() -> new IllegalArgumentException("Denúncia não encontrada"));

        Map<String, String> resposta = new HashMap<>();

        if (existente.isPresent()) {
            // Remover Like
            likeRepository.delete(existente.get());
            denuncia.setLikes(denuncia.getLikes() - 1);
            denunciaRepository.save(denuncia);
            resposta.put("mensagem", "Like removido com sucesso.");
        } else {
            // Adicionar Like
            Like like = new Like();
            like.setDenuncia(denuncia);
            like.setUsuario(usuario);
            likeRepository.save(like);

            denuncia.setLikes(denuncia.getLikes() + 1);
            denunciaRepository.save(denuncia);
            resposta.put("mensagem", "Like adicionado com sucesso.");
        }

        return resposta;
    }

}

