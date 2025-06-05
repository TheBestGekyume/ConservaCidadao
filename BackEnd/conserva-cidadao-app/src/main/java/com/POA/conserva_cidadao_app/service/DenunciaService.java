package com.POA.conserva_cidadao_app.service;

import com.POA.conserva_cidadao_app.dto.DenunciaResponseDTO;
import com.POA.conserva_cidadao_app.dto.UsuarioResponseDTO;
import com.POA.conserva_cidadao_app.model.Denuncia;
import com.POA.conserva_cidadao_app.repository.DenunciaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DenunciaService {

    private final DenunciaRepository denunciaRepository;

    public DenunciaService(DenunciaRepository denunciaRepository) {
        this.denunciaRepository = denunciaRepository;
    }

    public List<DenunciaResponseDTO> listarTodasDenuncias() {
        List<Denuncia> denuncias = denunciaRepository.findAll();
        return denuncias.stream().map(this::mapToDTO).toList();
    }

    private DenunciaResponseDTO mapToDTO(Denuncia denuncia) {
        UsuarioResponseDTO usuarioDTO = new UsuarioResponseDTO(
                denuncia.getUsuario().getId(),
                denuncia.getUsuario().getNome(),
                denuncia.getUsuario().getRole()
        );

        return new DenunciaResponseDTO(
                denuncia.getId(),
                usuarioDTO,
                denuncia.getTitulo(),
                denuncia.getDescricao(),
                denuncia.getStatus(),
                denuncia.getLikes(),
                denuncia.getImagens()
        );
    }
}
