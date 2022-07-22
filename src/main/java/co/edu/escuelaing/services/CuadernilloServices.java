package co.edu.escuelaing.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.escuelaing.entities.Cuadernillo;
import co.edu.escuelaing.entities.Materias;
import co.edu.escuelaing.entities.Usuario;
import co.edu.escuelaing.repository.CuadernilloRepo;
import co.edu.escuelaing.repository.MateriasRepo;
import co.edu.escuelaing.repository.ParticipantesRepo;
import co.edu.escuelaing.repository.UsuarioRepo;

@Service
public class CuadernilloServices {

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Autowired
    private CuadernilloRepo cuadernilloRepo;

    @Autowired
    private ParticipantesRepo participantesRepo;

    @Autowired
    private MateriasRepo materiasRepo;

    /**
     * Metodo que crea un cuadernillo
     * 
     * @param cuadernillo entidad del cuadernillo a crear
     * @return Cuadernillo creado
     *
     */
    public Cuadernillo create(Cuadernillo cuadernillo) {
        return cuadernilloRepo.save(cuadernillo);
    }

    /**
     * Metodo que crea un cuadernillo con todos sus atributos
     * 
     * @param administrador id del administrador del cuadernillo
     * @param nombre        nombre del cuadernillo
     * @param tablero       tablero del cuadernillo
     * @param publico       si el cuadernillo es publico o no
     * @param editable      si el cuadernillo es editable o no
     * @param materias      lista de materias del cuadernillo
     * @return Cuadernillo creado
     *
     */
    public Cuadernillo create(long administrador, String nombre, String tablero, boolean publico, boolean editable,
            long materias) {
        Usuario admin = usuarioRepo.findById(administrador).get();
        Materias materia = materiasRepo.findById(materias).get();
        Cuadernillo cuadernillo = new Cuadernillo(admin, nombre, tablero, publico, editable, materia);
        return create(cuadernillo);
    }

    /**
     * Metodo que obtiene todos los cuadernillos
     * 
     * @return Lista de cuadernillos
     */
    public List<Cuadernillo> getAllCadernillos() {
        return cuadernilloRepo.findAll();
    }

    /**
     * Metodo que obtiene un cuadernillo dado su id
     * 
     * @param id id del cuadernillo
     * @return Cuadernillo de forma opcional en caso de encontrarlo
     */
    public Optional<Cuadernillo> getCuadernilloById(Long id) {
        return cuadernilloRepo.findById(id);
    }

    /**
     * Metodo que obtiene un cuadernillo dado su nombre
     * 
     * @param name nombre del cuadernillo
     * @return Cuadernillo de forma opcional en caso de encontrarlo
     */
    public Optional<Cuadernillo> getCuadernilloByName(String name) {
        return cuadernilloRepo.findByName(name);
    }

    /**
     * Metodo que actualiza el tablero de un cuadernillo dado su nombre
     * 
     * @param nombre  nombre del cuadernillo
     * @param tablero tablero del cuadernillo
     */
    public void updateTablero(String nombre, String tablero) {
        cuadernilloRepo.updateTablero(nombre, tablero);
    }

    /**
     * Metodo que actualiza los booleanos de un cuadernillo dado su nombre
     * 
     * @param nombre   nombre del cuadernillo
     * @param publico  publico del cuadernillo
     * @param editable editable del cuadernillo
     *
     */
    public void updateBooleans(String nombre, boolean publico, boolean editable) {
        cuadernilloRepo.updateBooleans(nombre, publico, editable);
    }

    /**
     * Metodo que devuelve los cuadernillos de un usuario dado su id
     * 
     * @param usuarioId id del usuario
     * @return Lista de cuadernillos del usuario
     */
    public List<Cuadernillo> getParticipantes(Long usuarioId) {
        ArrayList<Cuadernillo> res = new ArrayList<>();
        try {
            res.addAll(cuadernilloRepo.findByUser(usuarioId));
            res.addAll(participantesRepo.findCuadernillosByUser(usuarioId)
                    .stream()
                    .map((participante) -> participante.getCuadernilloId()).collect(Collectors.toList()));
        } catch (Exception e) {
            System.out.println(e);
        }
        return res;
    }

    /**
     * Metodo que devuelve los cuadernillos publicos
     * 
     * @return Lista de cuadernillos publicos
     */
    public List<Cuadernillo> getPublics() {
        return cuadernilloRepo.getPublics();
    }

}
