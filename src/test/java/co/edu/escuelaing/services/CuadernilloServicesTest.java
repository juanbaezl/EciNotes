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

public class CuadernilloServicesTest {

    @Mock
    private CuadernilloRepo cuadernilloRepo;

    @Mock
    private ParticipantesRepo participantesRepo;

    @InjectMocks
    private CuadernilloServices cuadernilloServices;

    private Usuario usuario;
    private Usuario usuario2;
    private Cuadernillo cuadernillo;
    private Cuadernillo cuadernillo2;
    private Materias materia;
    private Participantes participante;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        usuario = new Usuario(Long.valueOf(0), "prueba", "prueba123", "Prueba", "PruebaMock");
        usuario2 = new Usuario(Long.valueOf(1), "pruebaw", "prueba1234", "Prueba2", "PruebaMock2");
        materia = new Materias(Long.valueOf(0), "MateriaPrueba");
        cuadernillo = new Cuadernillo(Long.valueOf(0), usuario, "CuadernilloPrueba", "", true, true,
                materia);
        cuadernillo2 = new Cuadernillo(Long.valueOf(1), usuario2, "CuadernilloPrueba2", "", true, true,
                materia);
        participante = new Participantes(usuario, cuadernillo2);
    }

    @Test
    void testCreate() {
        when(cuadernilloRepo.save(cuadernillo)).thenReturn(cuadernillo);
        assertEquals(cuadernilloServices.create(cuadernillo), cuadernillo);
    }

    @Test
    void testGetAllCadernillos() {
        when(cuadernilloRepo.findAll()).thenReturn(Arrays.asList(cuadernillo, cuadernillo2));
        assertEquals(cuadernilloServices.getAllCadernillos().size(), 2);

    }

    @Test
    void testGetCuadernilloById() {
        when(cuadernilloRepo.findById(Long.valueOf(0))).thenReturn(Optional.of(cuadernillo));
        assertEquals(cuadernilloServices.getCuadernilloById(Long.valueOf(0)).get(), cuadernillo);
    }

    @Test
    void testGetCuadernilloByName() {
        when(cuadernilloRepo.findByName("CuadernilloPrueba")).thenReturn(Optional.of(cuadernillo));
        assertEquals(cuadernilloServices.getCuadernilloByName("CuadernilloPrueba").get(), cuadernillo);
    }

    @Test
    void testGetParticipantes() {
        when(cuadernilloRepo.findByUser(Long.valueOf(0))).thenReturn(Arrays.asList(cuadernillo));
        when(participantesRepo.findCuadernillosByUser(Long.valueOf(0))).thenReturn(Arrays.asList(participante));
        assertEquals(cuadernilloServices.getParticipantes(Long.valueOf(0)).size(), 2);
    }

    @Test
    void testGetPublics() {
        when(cuadernilloRepo.getPublics()).thenReturn(Arrays.asList(cuadernillo, cuadernillo2));
        assertEquals(cuadernilloServices.getPublics().size(), 2);
    }
}
