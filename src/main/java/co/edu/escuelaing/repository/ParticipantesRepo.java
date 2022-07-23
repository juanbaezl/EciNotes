package co.edu.escuelaing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import co.edu.escuelaing.entities.Participantes;
import co.edu.escuelaing.entities.Usuario;

@Repository
public interface ParticipantesRepo extends JpaRepository<Participantes, Long> {

    @Query("Select p from Participantes p JOIN p.id.usuarioId u WHERE u.id = :usuarioId")
    List<Participantes> findCuadernillosByUser(@Param("usuarioId") Long usuarioId);

    @Query("Select p.id.usuarioId from Participantes p JOIN p.id.cuadernilloId u WHERE u.nombre = :cuadernilloNombre")
    List<Usuario> findUsersByCuadernillo(@Param("cuadernilloNombre") String cuadernilloNombre);

    @Modifying
    @Query("delete from Participantes p where p.id.cuadernilloId.nombre=:tablero and p.id.usuarioId.username=:nombre")
    void deleteParticipante(@Param("nombre") String nombre, @Param("tablero") String tablero);

}
