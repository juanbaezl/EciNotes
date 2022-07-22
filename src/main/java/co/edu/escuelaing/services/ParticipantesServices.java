package co.edu.escuelaing.services;

import java.util.ArrayList;
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

    /**
     * Metodo que crea un participante
     * 
     * @param participante entidad del participante a crear
     * @return Participante creado
     */
    public Participantes create(Participantes participantes) {
        return participantesRepo.save(participantes);
    }

    /**
     * Metodo que devuelve todos los participantes
     * 
     * @return Lista de participantes
     */
    public List<Participantes> getAllCadernillos() {
        return participantesRepo.findAll();
    }

    /**
     * Metodo que devuelve un participante dado su id
     * 
     * @param id
     * @return Participante
     */
    public Optional<Participantes> getCuadernilloById(Long id) {
        return participantesRepo.findById(id);
    }

    /**
     * Metodo que crea los participantes de un cuadernillo dados sus nombres y el
     * nombre del cuadernillo
     * 
     * @param usernames   lista con los nombres de los participantes
     * @param cuadernillo nombre del cuadernillo
     * @return Lista de participantes creados
     */
    public List<Participantes> createByList(List<String> usernames, String nombre_cuadernillo) {
        ArrayList<Participantes> res = new ArrayList<>();
        try {
            Cuadernillo cuadernillo = cuadernilloRepo.findByName(nombre_cuadernillo).get();
            for (String username : usernames) {
                Usuario usuario = usuarioRepo.findByUsername(username).get();
                Participantes participantes = new Participantes(usuario, cuadernillo);
                create(participantes);
                res.add(participantes);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return res;
    }
}
