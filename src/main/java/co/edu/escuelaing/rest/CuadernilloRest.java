package co.edu.escuelaing.rest;

import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.escuelaing.entities.Cuadernillo;
import co.edu.escuelaing.services.CuadernilloServices;

@RestController
@RequestMapping("/api/cuadernillo")
public class CuadernilloRest {

    @Autowired
    private CuadernilloServices cuadernilloServices;

    @PostMapping("/save")
    private void save(@PathParam("tablero") String tablero, @PathParam("nombre") String nombre,
            @PathParam("administrador") Long administrador, @PathParam("publico") boolean publico,
            @PathParam("editable") boolean editable, @PathParam("materias") Long materias) {
        cuadernilloServices.create(administrador, nombre, tablero, publico, editable, materias);
    }

    @GetMapping("/getTablero")
    private String getByName(@PathParam("nombre") String nombre) {
        Optional<Cuadernillo> cuadernillo = cuadernilloServices.getCuadernilloByName(nombre);
        return cuadernillo.isPresent() ? cuadernillo.get().getTablero() : "{}";
    }

    @PostMapping("/updateTablero")
    private void updateTablero(@PathParam("nombre") String nombre, @PathParam("tablero") String tablero) {
        cuadernilloServices.updateTablero(nombre, tablero);
    }
}