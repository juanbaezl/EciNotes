package co.edu.escuelaing.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import co.edu.escuelaing.entities.Cuadernillo;

@Repository
public interface CuadernilloRepo extends JpaRepository<Cuadernillo, Long> {

        @Query("Select c from Cuadernillo c where c.nombre = :nombre")
        Optional<Cuadernillo> findByName(@Param("nombre") String nombre);

        @Query("Select c from Cuadernillo c where c.publico = true")
        List<Cuadernillo> getPublics();

        @Query("Select c from Cuadernillo c JOIN c.administrador u where u.id = :administrador")
        List<Cuadernillo> findByUser(@Param("administrador") Long administrador);

        @Modifying
        @Query("update Cuadernillo c set c.tablero = :tablero where c.nombre = :nombre")
        @Transactional
        void updateTablero(@Param(value = "nombre") String nombre, @Param(value = "tablero") String tablero);

        @Modifying
        @Query("update Cuadernillo c set c.publico = :publico, c.editable = :editable where c.nombre = :nombre")
        @Transactional
        void updateBooleans(@Param(value = "nombre") String nombre, @Param(value = "publico") boolean publico,
                        @Param(value = "editable") boolean editable);
}
