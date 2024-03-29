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
     * @param participantes entidad del participante a crear
     * @return Participante creado
     */
    public Participantes create(Participantes participantes) {
        return participantesRepo.save(participantes);
    }

    /**
     * Metodo que crea un participante con todos sus atributos
     * 
     * @param nombre  nombre del participante
     * @param tablero tablero del participante
     * @return Participante creado
     *
     */
    public Participantes create(String nombre, String tablero) {
        Cuadernillo cuadernillo = cuadernilloRepo.findByName(tablero).get();
        Usuario usuario = usuarioRepo.findByUsername(nombre).get();
        Participantes participantes = new Participantes(usuario, cuadernillo);
        return participantesRepo.save(participantes);
    }

    /**
     * Metodo que elimina un participante dado su nombre y nombre del cuadernillo
     * 
     * @param nombre  nombre del participante
     * @param tablero nombre del cuadernillo
     */
    public void delete(String nombre, String tablero) {
        Cuadernillo cuadernillo = cuadernilloRepo.findByName(tablero).get();
        Usuario usuario = usuarioRepo.findByUsername(nombre).get();
        Participantes participantes = new Participantes(usuario, cuadernillo);
        participantesRepo.delete(participantes);
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
     * @param id id del participante a buscar
     * @return Participante
     */
    public Optional<Participantes> getCuadernilloById(Long id) {
        return participantesRepo.findById(id);
    }

    /**
     * Metodo que devuelve los usuarios participantes de un cuadernillo dado su
     * nombre
     * 
     * @param nombre nombre del cuadernillo
     * @return Lista de Usuarios
     */
    public List<Usuario> getParticipantesByCuadernillo(String nombre) {
        return participantesRepo.findUsersByCuadernillo(nombre);
    }

    /**
     * Metodo que devuelve los usuarios no participantes de un cuadernillo dado su
     * nombre
     * 
     * @param nombre nombre del cuadernillo
     * @return Lista de Usuarios
     */
    public List<Usuario> getUsuariosNotInCuadernillo(String nombre) {
        List<Usuario> usuarios = usuarioRepo.findAll();
        List<Usuario> usuariosIn = getParticipantesByCuadernillo(nombre);
        for (Usuario usuarioIn : usuariosIn) {
            usuarios.removeIf(filter -> filter.getId() == usuarioIn.getId());
        }
        return usuarios;
    }

    /**
     * Metodo que crea los participantes de un cuadernillo dados sus nombres y el
     * nombre del cuadernillo
     * 
     * @param usernames          lista con los nombres de los participantes
     * @param nombre_cuadernillo nombre del cuadernillo
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
