package co.edu.escuelaing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import co.edu.escuelaing.entities.Participantes;

@Repository
public interface ParticipantesRepo extends JpaRepository<Participantes, Long> {

    /**
     * Metodo que busca los cuadernillos en los que participa un usuario
     *
     * @param usuario
     * @return Lista de participantes
     */
    @Query("Select p from Participantes p JOIN p.id.usuarioId u WHERE u.id = :usuarioId")
    List<Participantes> findCuadernillosByUser(@Param("usuarioId") Long usuarioId);

}
