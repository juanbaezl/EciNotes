package co.edu.escuelaing.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.escuelaing.entities.Cuadernillo;
import co.edu.escuelaing.repository.CuadernilloRepo;
import co.edu.escuelaing.repository.ParticipantesRepo;

@Service
public class CuadernilloServices {

    @Autowired
    private CuadernilloRepo cuadernilloRepo;

    @Autowired
    private ParticipantesRepo participantesRepo;

    public Cuadernillo create(Cuadernillo cuadernillo) {
        return cuadernilloRepo.save(cuadernillo);
    }

    public void create(long administrador, String nombre, String tablero, boolean publico, boolean editable,
            long materias) {
        cuadernilloRepo.saveByArguments(administrador, nombre, tablero, publico, editable, materias);
    }

    public List<Cuadernillo> getAllCadernillos() {
        return cuadernilloRepo.findAll();
    }

    public void deleteCuadernillo(Cuadernillo cuadernillo) {
        cuadernilloRepo.delete(cuadernillo);
    }

    public Optional<Cuadernillo> getCuadernilloById(Long id) {
        return cuadernilloRepo.findById(id);
    }

    public Optional<Cuadernillo> getCuadernilloByName(String name) {
        return cuadernilloRepo.findByName(name);
    }

    public void updateTablero(String nombre, String tablero) {
        cuadernilloRepo.updateTablero(nombre, tablero);
    }

    public void updateBooleans(String nombre, boolean publico, boolean editable) {
        cuadernilloRepo.updateBooleans(nombre, publico, editable);
    }

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

    public List<Cuadernillo> getPublics() {
        return cuadernilloRepo.getPublics();
    }

}
