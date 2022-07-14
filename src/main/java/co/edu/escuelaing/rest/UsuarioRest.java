package co.edu.escuelaing.rest;

import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/login")
    private String getUserByNamePasswd(@PathParam("name") String name,
            @PathParam("passwd") String passwd) {
        Optional<Usuario> user = usuarioServices.getUserByNamePasswd(name, passwd);
        return user.isPresent() ? user.get().toString() : "{}";
    }
}
