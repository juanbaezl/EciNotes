package co.edu.escuelaing.rest;

import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.escuelaing.entities.Usuario;
import co.edu.escuelaing.services.UsuariosServices;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioRest {

    @Autowired
    private UsuariosServices usuarioServices;

    /**
     * Metodo que devuelve una Usuario dado su username y password
     *
     * @param username
     * @param password
     * @return String con el json del Usuario
     */
    @PostMapping("/login")
    private String getUserByNamePasswd(@PathParam("name") String name,
            @PathParam("passwd") String passwd) {
        Optional<Usuario> user = usuarioServices.getUserByNamePasswd(name, passwd);
        return user.isPresent() ? user.get().toString() : "{}";
    }

    /**
     * Metodo que devuelve una lista de Usuarios que no son el usuario con el id
     * dado
     *
     * @param is
     * @return Lista de usuarios
     */
    @GetMapping("/users")
    private List<Usuario> getAllUsersExceptList(@PathParam("id") Long id) {
        return usuarioServices.getAllUsersExceptList(id);
    }
}
