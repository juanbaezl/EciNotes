package co.edu.escuelaing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.edu.escuelaing.entities.Participantes;

@Repository
public interface ParticipantesRepo extends JpaRepository<Participantes, Long> {

}
