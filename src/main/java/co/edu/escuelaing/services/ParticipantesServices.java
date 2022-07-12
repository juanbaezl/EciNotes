package co.edu.escuelaing.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.escuelaing.entities.Participantes;
import co.edu.escuelaing.repository.ParticipantesRepo;

@Service
public class ParticipantesServices {

    @Autowired
    private ParticipantesRepo participantesRepo;

    public Participantes create(Participantes participantes) {
        return participantesRepo.save(participantes);
    }

    public List<Participantes> getAllCadernillos() {
        return participantesRepo.findAll();
    }

    public void deleteCuadernillo(Participantes participantes) {
        participantesRepo.delete(participantes);
    }

    public Optional<Participantes> getCuadernilloById(Long id) {
        return participantesRepo.findById(id);
    }
}
