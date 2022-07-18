package co.edu.escuelaing.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.escuelaing.entities.Cuadernillo;
import co.edu.escuelaing.entities.Participantes;
import co.edu.escuelaing.entities.Usuario;
import co.edu.escuelaing.repository.CuadernilloRepo;
import co.edu.escuelaing.repository.ParticipantesRepo;
import co.edu.escuelaing.repository.UsuarioRepo;

@Service
public class ParticipantesServices {

    @Autowired
    private ParticipantesRepo participantesRepo;

    @Autowired
    private CuadernilloRepo cuadernilloRepo;

    @Autowired
    private UsuarioRepo usuarioRepo;

    public Participantes create(Participantes participantes) {
        return participantesRepo.save(participantes);
    }

    public List<Participantes> getAllCadernillos() {
        return participantesRepo.findAll();
    }

    public void deleteCuadernillo(Participantes participantes) {
        participantesRepo.delete(participantes);
    }

    public Optional<Participantes> getCuadernilloById(Long id) {
        return participantesRepo.findById(id);
    }

    public void createByList(List<String> usernames, String nombre_cuadernillo) {
        try {
            Cuadernillo cuadernillo = cuadernilloRepo.findByName(nombre_cuadernillo).get();
            for (String username : usernames) {
                Usuario usuario = usuarioRepo.findByUsername(username).get();
                create(new Participantes(usuario, cuadernillo));
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
