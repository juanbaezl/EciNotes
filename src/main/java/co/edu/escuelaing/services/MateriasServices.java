package co.edu.escuelaing.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.escuelaing.entities.Materias;
import co.edu.escuelaing.repository.MateriasRepo;

@Service
public class MateriasServices {

    @Autowired
    private MateriasRepo materiasRepo;

    public Materias create(Materias materia) {
        return materiasRepo.save(materia);
    }

    public List<Materias> getAllCadernillos() {
        return materiasRepo.findAll();
    }

    public void deleteCuadernillo(Materias materia) {
        materiasRepo.delete(materia);
    }

    public Optional<Materias> getCuadernilloById(Long id) {
        return materiasRepo.findById(id);
    }
}
