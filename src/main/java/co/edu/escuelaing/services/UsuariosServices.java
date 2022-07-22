package co.edu.escuelaing.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.escuelaing.entities.Usuario;
import co.edu.escuelaing.repository.UsuarioRepo;

@Service
public class UsuariosServices {

    @Autowired
    private UsuarioRepo usuarioRepo;

    /**
     * Metodo que obtiene todos los usuarios
     * 
     * @return Lista de usuarios
     *
     */
    public List<Usuario> getAllUsers() {
        return usuarioRepo.findAll();
    }

    /**
     * Metodo que obtiene un usuario dado su id
     * 
     * @param id id del usuario
     * @return Usuario
     */
    public Optional<Usuario> getUserById(Long id) {
        return usuarioRepo.findById(id);
    }

    /**
     * Metodo que obtiene un usuario dado su username y password
     * 
     * @param username username del usuario
     * @param passwd   password del usuario
     * @return Usuario opcional en caso de existir
     */
    public Optional<Usuario> getUserByNamePasswd(String username, String passwd) {
        return usuarioRepo.findByName(username, passwd);
    }

    /**
     * Metodo que obtiene los usuarios diferentes al id dado
     * 
     * @param id id del usuario
     * @return Lista de usuarios
     */
    public List<Usuario> getAllUsersExceptList(Long id) {
        return usuarioRepo.getUsersMinusId(id);
    }
}
