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

    public List<Materias> getAllMaterias() {
        return materiasRepo.findAll();
    }

    public void deleteMateria(Materias materia) {
        materiasRepo.delete(materia);
    }

    public Optional<Materias> getMateriaById(Long id) {
        return materiasRepo.findById(id);
    }
}
