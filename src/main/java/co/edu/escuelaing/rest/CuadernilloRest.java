package co.edu.escuelaing.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azure.messaging.webpubsub.WebPubSubServiceClient;
import com.azure.messaging.webpubsub.WebPubSubServiceClientBuilder;
import com.azure.messaging.webpubsub.models.GetClientAccessTokenOptions;
import com.azure.messaging.webpubsub.models.WebPubSubContentType;

import co.edu.escuelaing.entities.Cuadernillo;
import co.edu.escuelaing.entities.Usuario;
import co.edu.escuelaing.services.CuadernilloServices;
import co.edu.escuelaing.services.ParticipantesServices;

@RestController
@RequestMapping("/api/cuadernillo")
public class CuadernilloRest {

    private String connectionString = "Endpoint=https://ecinotes.webpubsub.azure.com;AccessKey=gwLYUQuRL4GEss8yNJLv6Qd1AZKrr44Uns5U8nYCINs=;Version=1.0;";

    @Autowired
    private CuadernilloServices cuadernilloServices;

    @Autowired
    private ParticipantesServices participantesServices;

    private HashMap<String, String> conexion = new HashMap<String, String>();

    /**
     * Metodo que devuelve una url de conexion con azure para publicar mensajes dado
     * el nombre del tablero
     *
     * @param nombre del tablero
     * @return url de conexion
     */
    @GetMapping("/conexion")
    public String getConexion(@PathParam("nombre") String nombre) {
        nombre = nombre.replace(" ", "_");
        String res = "";
        if (conexion.containsKey(nombre)) {
            res = conexion.get(nombre);
        } else {
            WebPubSubServiceClient webPubSubServiceClient = new WebPubSubServiceClientBuilder()
                    .connectionString(connectionString)
                    .hub(nombre).buildClient();
            res = webPubSubServiceClient.getClientAccessToken(new GetClientAccessTokenOptions()).getUrl();
            conexion.put(nombre, res);
        }
        return "{\"value\":\"" + res + "\"}";
    }

    /**
     * Metodo que envia el mensaje dado al hub de azure dado
     *
     * @param hub nombre del tablero
     * @param msg mensaje a enviar
     */
    @PostMapping("/sendToPubSub")
    public void sendToPubSub(@PathParam("hub") String hub, @PathParam("msg") String msg) {
        WebPubSubServiceClient webPubSubServiceClient = new WebPubSubServiceClientBuilder()
                .connectionString(connectionString)
                .hub(hub)
                .buildClient();
        webPubSubServiceClient.sendToAll(msg, WebPubSubContentType.APPLICATION_JSON);
    }

    /**
     * Metodo que crea un cuadernillo y sus participantes
     *
     * @param tablero       tablero
     * @param participantes lista de participantes
     * @param nombre        nombre del cuadernillo
     * @param administrador administrador del cuadernillo
     * @param publico       publico del cuadernillo
     * @param editable      editable del cuadernillo
     * @param materias      materias del cuadernillo
     */
    @PostMapping("/save")
    private void save(@PathParam("tablero") String tablero, @PathParam("nombre") String nombre,
            @PathParam("administrador") Long administrador, @PathParam("publico") boolean publico,
            @PathParam("editable") boolean editable, @PathParam("materias") Long materias,
            @PathParam("participantes") String participantes) {
        cuadernilloServices.create(administrador, nombre, tablero, publico, editable, materias);
        participantesServices.createByList(Arrays.asList(participantes.split(",")), nombre);
    }

    /**
     * Metodo que devuelve un cuadernillo dado el nombre
     *
     * @param nombre nombre del cuadernillo
     * @return lista de cuadernillos con solo un cuadernillo
     */
    @GetMapping("/getTablero")
    private List<Cuadernillo> getByName(@PathParam("nombre") String nombre) {
        Optional<Cuadernillo> cuadernillo = cuadernilloServices.getCuadernilloByName(nombre);
        ArrayList<Cuadernillo> cuadernillos = new ArrayList<>();
        if (cuadernillo.isPresent()) {
            cuadernillos.add(cuadernillo.get());
        }
        return cuadernillos;
    }

    /**
     * Metodo que devuelve una lista de cuadernillos dado el id del usuario
     *
     * @param user id del usuario
     * @return lista de cuadernillos
     */
    @GetMapping("/getCuadernillos")
    private List<Cuadernillo> getCuadernillos(@PathParam("user") Long user) {
        return cuadernilloServices.getParticipantes(user);
    }

    /**
     * Metodo que devuelve una lista de cuadernillos publicos
     *
     * @return lista de cuadernillos
     */
    @GetMapping("/getPublics")
    private List<Cuadernillo> getPublics() {
        return cuadernilloServices.getPublics();
    }

    /**
     * Metodo que actualiza el tablero de un cuadernillo dado su nombre
     *
     * @Param nombre nombre del cuadernillo
     * @Param tablero tablero
     * @return lista de cuadernillos
     */
    @PostMapping("/updateTablero")
    private void updateTablero(@PathParam("nombre") String nombre, @PathParam("tablero") String tablero) {
        cuadernilloServices.updateTablero(nombre, tablero);
    }

    /**
     * Metodo que actualiza los booleanos de un cuadernillo dado su nombre
     *
     * @Param nombre nombre del cuadernillo
     * @param publico  publico del cuadernillo
     * @param editable editable del cuadernillo
     * @return lista de cuadernillos
     */
    @PostMapping("/updateBooleans")
    private void updateBooleans(@PathParam("nombre") String nombre, @PathParam("publico") boolean publico,
            @PathParam("editable") boolean editable) {
        cuadernilloServices.updateBooleans(nombre, publico, editable);
    }

    /**
     * Metodo que obtiene los participantes de un cuadernillo dado su nombre
     *
     * @Param nombre nombre del cuadernillo
     * @return lista de Usuarios
     */
    @GetMapping("/getParticipantes")
    private List<Usuario> getParticipantes(@PathParam("nombre") String nombre) {
        return participantesServices.getParticipantesByCuadernillo(nombre);
    }

    /**
     * Metodo que obtiene los usuarios no participantes de un cuadernillo dado su
     * nombre
     *
     * @Param nombre nombre del cuadernillo
     * @return lista de Usuarios
     */
    @GetMapping("/GetUsersNotInCuadernillo")
    private List<Usuario> getUsersNotInCuadernillo(@PathParam("nombre") String nombre) {
        return participantesServices.getUsuariosNotInCuadernillo(nombre);
    }

    /**
     * Metodo que agrega un participante a un cuadernillo dado sus nombres
     * 
     * @param nombre  nombre del usuario
     * @param tablero nombre del tablero
     */
    @PostMapping("/saveParticipante")
    private void saveParticipante(@PathParam("nombre") String nombre, @PathParam("tablero") String tablero) {
        participantesServices.create(nombre, tablero);
    }

    /**
     * Metodo que elimina un participante de un cuadernillo dado sus nombres
     * 
     * @param nombre  nombre del usuario
     * @param tablero nombre del tablero
     */
    @PostMapping("/deleteParticipante")
    private void deleteParticipante(@PathParam("nombre") String nombre, @PathParam("tablero") String tablero) {
        participantesServices.delete(nombre, tablero);
    }
}
