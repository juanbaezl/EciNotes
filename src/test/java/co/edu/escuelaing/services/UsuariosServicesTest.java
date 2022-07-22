package co.edu.escuelaing.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import co.edu.escuelaing.entities.Usuario;
import co.edu.escuelaing.repository.UsuarioRepo;

public class UsuariosServicesTest {

    @Mock
    private UsuarioRepo usuarioRepo;

    @InjectMocks
    private UsuariosServices usuariosServices;

    private Usuario usuario;
    private Usuario usuario2;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        usuario = new Usuario(Long.valueOf(0), "prueba", "prueba123", "Prueba", "PruebaMock");
        usuario2 = new Usuario(Long.valueOf(1), "pruebaw", "prueba1234", "Prueba2", "PruebaMock2");
    }

    @Test
    void testGetAllUsers() {
        when(usuarioRepo.findAll()).thenReturn(Arrays.asList(usuario, usuario2));
        assertEquals(usuariosServices.getAllUsers().size(), 2);
    }

    @Test
    void testGetAllUsersExceptList() {
        when(usuarioRepo.getUsersMinusId(Long.valueOf(0))).thenReturn(Arrays.asList(usuario2));
        assertEquals(usuariosServices.getAllUsersExceptList(Long.valueOf(0)).get(0), usuario2);

    }

    @Test
    void testGetUserById() {
        when(usuarioRepo.findById(Long.valueOf(0))).thenReturn(Optional.of(usuario));
        assertEquals(usuariosServices.getUserById(Long.valueOf(0)).get(), usuario);
    }

    @Test
    void testGetUserByNamePasswd() {
        when(usuarioRepo.findByName("prueba", "prueba123")).thenReturn(Optional.of(usuario));
        assertEquals(usuariosServices.getUserByNamePasswd("prueba", "prueba123").get(), usuario);
    }

    @Test
    void testGetUserByNamePasswd2() {
        when(usuarioRepo.findByName("prueba", "prueba123")).thenReturn(Optional.of(usuario));
        when(usuarioRepo.findByName("pruebaw", "prueba1234")).thenReturn(Optional.of(usuario2));
        assertFalse(usuariosServices.getUserByNamePasswd("NoDeberia", "Encontrar").isPresent());
    }
}
