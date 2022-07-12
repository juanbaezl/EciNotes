package co.edu.escuelaing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.edu.escuelaing.entities.Cuadernillo;

@Repository
public interface CuadernilloRepo extends JpaRepository<Cuadernillo, Long> {

}
