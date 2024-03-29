package co.edu.escuelaing.rest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebRest {

    @Resource
    private HttpServletRequest request;

    /**
     * Metodo que devuelve el status del servidos
     * 
     * @return String con el json del status
     */
    @GetMapping("/status")
    public String status() {
        String name = (String) request.getSession().getAttribute("name");
        return "{\"status\":\"Greetings from Spring Boot "
                + name + ". " + java.time.LocalDate.now() + ", "
                + java.time.LocalTime.now()
                + ". " + "The server is Running!\"}";
    }

    /**
     * Metodo que devuelve el id unico de una sesion
     * 
     * @return String con el json del id
     */
    @GetMapping("/getId")
    public String getId() {
        String id = request.getSession().getId();
        return "{\"id\":\"" + id + "\"}";
    }
}
