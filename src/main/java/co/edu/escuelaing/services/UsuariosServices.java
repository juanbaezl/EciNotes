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

    public Usuario create(Usuario usuario) {
        return usuarioRepo.save(usuario);
    }

    public List<Usuario> getAllUsers() {
        return usuarioRepo.findAll();
    }

    public void deleteUser(Usuario usuario) {
        usuarioRepo.delete(usuario);
    }

    public Optional<Usuario> getUserById(Long id) {
        return usuarioRepo.findById(id);
    }

    public Optional<Usuario> getUserByNamePasswd(String username, String passwd) {
        return usuarioRepo.findByName(username, passwd);
    }
}
