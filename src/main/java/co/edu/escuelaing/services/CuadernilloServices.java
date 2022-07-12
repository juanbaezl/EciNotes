package co.edu.escuelaing.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.escuelaing.entities.Cuadernillo;
import co.edu.escuelaing.repository.CuadernilloRepo;

@Service
public class CuadernilloServices {

    @Autowired
    private CuadernilloRepo cuadernilloRepo;

    public Cuadernillo create(Cuadernillo cuadernillo) {
        return cuadernilloRepo.save(cuadernillo);
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

}
