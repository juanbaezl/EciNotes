package co.edu.escuelaing.entities;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "participantes")
public class Participantes implements Serializable {

    @EmbeddedId
    public EventId id;

    /**
     * Constructor de la clase Participantes
     */
    public Participantes() {
    }

    /**
     * Constructor de la clase Participantes dado un evento embebido
     *
     * @param id evento embebido
     */
    public Participantes(EventId id) {
        this.id = id;
    }

    /**
     * Metodo getter id de la clase Participantes
     * 
     * @param usuarioId     Entidad usuario a instanciar
     * @param cuadernilloId Entidad cuadernillo a instanciar
     */
    public Participantes(Usuario usuarioId, Cuadernillo cuadernilloId) {
        this.id = new EventId(usuarioId, cuadernilloId);
    }

    /**
     * Metodo getter EventId(Evento Embebido) de la clase Participantes
     * 
     * @return the id
     */
    public EventId getId() {
        return id;
    }

    /**
     * Metodo setter EventId(Evento Embebido) de la clase Participantes
     * 
     * @param id the id to set
     */
    public void setId(EventId id) {
        this.id = id;
    }

    /**
     * Metodo getter usuarioId(Entidad Usuario) de la clase Participantes
     * 
     * @return the usuarioId
     */
    public Usuario getUsuarioId() {
        return id.getUsuarioId();
    }

    /**
     * Metodo setter usuarioId(Entidad Usuario) de la clase Participantes
     * 
     * @param usuarioId the usuarioId to set
     */
    public void setUsuarioId(Usuario usuarioId) {
        this.id.setUsuarioId(usuarioId);
    }

    /**
     * Metodo getter cuadernilloId(Entidad Cuadernillo) de la clase Participantes
     * 
     * @return the cuadernilloId
     */
    public Cuadernillo getCuadernilloId() {
        return id.getCuadernilloId();
    }

    /**
     * Metodo setter cuadernilloId(Entidad Cuadernillo) de la clase Participantes
     * 
     * @param cuadernilloId the cuadernilloId to set
     */
    public void setCuadernilloId(Cuadernillo cuadernilloId) {
        this.id.setCuadernilloId(cuadernilloId);
    }

}

@Embeddable
class EventId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "usuarioId", nullable = false)
    private Usuario usuarioId;

    @ManyToOne
    @JoinColumn(name = "cuadernilloId", nullable = false)
    private Cuadernillo cuadernilloId;

    /**
     * Constructor de la clase EventId
     */
    public EventId(Usuario usuarioId, Cuadernillo cuadernilloId) {
        this.usuarioId = usuarioId;
        this.cuadernilloId = cuadernilloId;
    }

    /**
     * Constructor de la clase EventId
     */
    public EventId() {
    }

    /**
     * Metodo getter usuarioId(Entidad Usuario) de la clase EventId
     * 
     * @return the usuarioId
     */
    public Usuario getUsuarioId() {
        return usuarioId;
    }

    /**
     * Metodo setter usuarioId(Entidad Usuario) de la clase EventId
     * 
     * @param usuarioId the usuarioId to set
     */
    public void setUsuarioId(Usuario usuarioId) {
        this.usuarioId = usuarioId;
    }

    /**
     * Metodo getter cuadernilloId(Entidad Cuadernillo) de la clase EventId
     * 
     * @return the cuadernilloId
     */
    public Cuadernillo getCuadernilloId() {
        return cuadernilloId;
    }

    /**
     * Metodo setter cuadernilloId(Entidad Cuadernillo) de la clase EventId
     * 
     * @param cuadernilloId the cuadernilloId to set
     */
    public void setCuadernilloId(Cuadernillo cuadernilloId) {
        this.cuadernilloId = cuadernilloId;
    }

}
