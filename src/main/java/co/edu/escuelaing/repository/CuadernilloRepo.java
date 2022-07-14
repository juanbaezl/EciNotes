package co.edu.escuelaing.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import co.edu.escuelaing.entities.Cuadernillo;

@Repository
public interface CuadernilloRepo extends JpaRepository<Cuadernillo, Long> {

    @Modifying
    @Query(value = "insert into Cuadernillo (editable, nombre, publico, tablero, administrador, materias) VALUES (:editable, :nombre, :publico, :tablero, :administrador, :materias)", nativeQuery = true)
    @Transactional
    void saveByArguments(
            @Param("administrador") long administrador,
            @Param("nombre") String nombre,
            @Param("tablero") String tablero,
            @Param("publico") boolean publico,
            @Param("editable") boolean editable,
            @Param("materias") long materias);
}
