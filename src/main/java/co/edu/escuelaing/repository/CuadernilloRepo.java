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

        /**
         * Metodo que obtiene un cuadernillo dado su id de la base de datos
         *
         * @param id
         * @return Cuadernillo de forma opcional en caso de encontrarlo
         *
         */
        @Query("Select c from Cuadernillo c where c.nombre = :nombre")
        Optional<Cuadernillo> findByName(@Param("nombre") String nombre);

        /**
         * Metodo que obtiene los cuadernillos publicos de la base de datos
         *
         * @return Lista de cuadernillos
         */
        @Query("Select c from Cuadernillo c where c.publico = true")
        List<Cuadernillo> getPublics();

        /**
         * Metodo que obtiene los cuadernillos donde es administrador un usuario de la
         * base de datos
         *
         * @param administrador
         * @return Lista de cuadernillos
         */
        @Query("Select c from Cuadernillo c JOIN c.administrador u where u.id = :administrador")
        List<Cuadernillo> findByUser(@Param("administrador") Long administrador);

        /**
         * Metodo que actualiza el tablero en la base de datos
         *
         * @param nombre  nombre del cuadernillo a actualizar
         * @param tablero tablero a nuevo
         *
         * @return Lista de cuadernillos
         */
        @Modifying
        @Query("update Cuadernillo c set c.tablero = :tablero where c.nombre = :nombre")
        @Transactional
        void updateTablero(@Param(value = "nombre") String nombre, @Param(value = "tablero") String tablero);

        /**
         * Metodo que actualiza los valores booleanos en la base de datos
         *
         * @param nombre   nombre del cuadernillo a actualizar
         * @param publico  booleano
         * @param editable booleano
         *
         * @return Lista de cuadernillos
         */
        @Modifying
        @Query("update Cuadernillo c set c.publico = :publico, c.editable = :editable where c.nombre = :nombre")
        @Transactional
        void updateBooleans(@Param(value = "nombre") String nombre, @Param(value = "publico") boolean publico,
                        @Param(value = "editable") boolean editable);
}
