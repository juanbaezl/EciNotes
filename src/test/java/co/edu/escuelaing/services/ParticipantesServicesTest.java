package co.edu.escuelaing.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import co.edu.escuelaing.entities.Cuadernillo;
import co.edu.escuelaing.entities.Materias;
import co.edu.escuelaing.entities.Participantes;
import co.edu.escuelaing.entities.Usuario;
import co.edu.escuelaing.repository.CuadernilloRepo;
import co.edu.escuelaing.repository.ParticipantesRepo;
import co.edu.escuelaing.repository.UsuarioRepo;

public class ParticipantesServicesTest {

    @Mock
    private ParticipantesRepo participantesRepo;

    @Mock
    private UsuarioRepo usuarioRepo;

    @Mock
    private CuadernilloRepo cuadernilloRepo;

    @InjectMocks
    private ParticipantesServices participantesServices;

    private Usuario usuario;
    private Usuario usuario2;
    private Usuario usuario3;
    private Cuadernillo cuadernillo;
    private Cuadernillo cuadernillo2;
    private Materias materia;
    private Participantes participante;
    private Participantes participante2;
    private Participantes participante3;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        usuario = new Usuario(Long.valueOf(0), "prueba", "prueba123", "Prueba", "PruebaMock");
        usuario2 = new Usuario(Long.valueOf(1), "pruebaw", "prueba1234", "Prueba2", "PruebaMock2");
        usuario3 = new Usuario(Long.valueOf(2), "pruebaw3", "prueba12345", "Prueba3", "PruebaMock3");
        materia = new Materias(Long.valueOf(0), "MateriaPrueba");
        cuadernillo = new Cuadernillo(Long.valueOf(0), usuario, "CuadernilloPrueba", "", true, true,
                materia);
        cuadernillo2 = new Cuadernillo(Long.valueOf(1), usuario2, "CuadernilloPrueba2", "", true, true,
                materia);
        participante = new Participantes(usuario, cuadernillo2);
        participante2 = new Participantes(usuario2, cuadernillo);
        participante3 = new Participantes(usuario3, cuadernillo);
        when(participantesRepo.save(participante)).thenReturn(participante);
        when(participantesRepo.save(participante2)).thenReturn(participante2);
        when(participantesRepo.save(participante3)).thenReturn(participante3);
    }

    @Test
    void testCreate() {
        assertEquals(participantesServices.create(participante), participante);
        assertEquals(participantesServices.create(participante2), participante2);
        assertEquals(participantesServices.create(participante3), participante3);
    }

    @Test
    void testCreateByList() {
        when(usuarioRepo.findByUsername("pruebaw")).thenReturn(Optional.of(usuario2));
        when(usuarioRepo.findByUsername("pruebaw3")).thenReturn(Optional.of(usuario3));
        when(cuadernilloRepo.findByName("CuadernilloPrueba")).thenReturn(Optional.of(cuadernillo));
        assertEquals(participantesServices.createByList(Arrays.asList("pruebaw", "pruebaw3"),
                "CuadernilloPrueba").size(),
                2);
    }

    @Test
    void testGetAllCadernillos() {
        when(participantesRepo.findAll()).thenReturn(Arrays.asList(participante, participante2,
                participante3));
        assertEquals(participantesServices.getAllCadernillos().size(), 3);
    }

    @Test
    void testGetCuadernilloById() {
        when(participantesRepo.findById(Long.valueOf(0))).thenReturn(Optional.of(participante));
        assertEquals(participantesServices.getCuadernilloById(Long.valueOf(0)).get(), participante);
    }
}
