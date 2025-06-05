package com.POA.conserva_cidadao_app.repository;

import com.POA.conserva_cidadao_app.model.Denuncia;
import com.POA.conserva_cidadao_app.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUsuarioIdAndDenunciaId(Long usuarioId, Long denunciaId);
}

