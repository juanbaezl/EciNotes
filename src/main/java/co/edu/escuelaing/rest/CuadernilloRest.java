package co.edu.escuelaing.rest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.escuelaing.entities.Cuadernillo;
import co.edu.escuelaing.services.CuadernilloServices;
import co.edu.escuelaing.services.ParticipantesServices;

@RestController
@RequestMapping("/api/cuadernillo")
public class CuadernilloRest {

    @Autowired
    private CuadernilloServices cuadernilloServices;

    @Autowired
    private ParticipantesServices participantesServices;

    @PostMapping("/save")
    private void save(@PathParam("tablero") String tablero, @PathParam("nombre") String nombre,
            @PathParam("administrador") Long administrador, @PathParam("publico") boolean publico,
            @PathParam("editable") boolean editable, @PathParam("materias") Long materias,
            @PathParam("participantes") String participantes) {
        cuadernilloServices.create(administrador, nombre, tablero, publico, editable, materias);
        participantesServices.createByList(Arrays.asList(participantes.split(",")), nombre);
    }

    @GetMapping("/getTablero")
    private String getByName(@PathParam("nombre") String nombre) {
        Optional<Cuadernillo> cuadernillo = cuadernilloServices.getCuadernilloByName(nombre);
        return cuadernillo.isPresent() ? cuadernillo.get().getTablero() : "{}";
    }

    @GetMapping("/getCuadernillos")
    private List<Cuadernillo> getCuadernillos(@PathParam("user") Long user) {
        return cuadernilloServices.getParticipantes(user);
    }

    @GetMapping("/getPublics")
    private List<Cuadernillo> getPublics() {
        return cuadernilloServices.getPublics();
    }

    @PostMapping("/updateTablero")
    private void updateTablero(@PathParam("nombre") String nombre, @PathParam("tablero") String tablero) {
        cuadernilloServices.updateTablero(nombre, tablero);
    }
}
