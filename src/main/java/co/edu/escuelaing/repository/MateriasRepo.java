package co.edu.escuelaing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.edu.escuelaing.entities.Materias;

@Repository
public interface MateriasRepo extends JpaRepository<Materias, Long> {

}
