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

    public Participantes() {
    }

    public Participantes(EventId id) {
        this.id = id;
    }

    public Participantes(Usuario usuarioId, Cuadernillo cuadernilloId) {
        this.id = new EventId(usuarioId, cuadernilloId);
    }

    public EventId getId() {
        return id;
    }

    public void setId(EventId id) {
        this.id = id;
    }

    public Usuario getUsuarioId() {
        return id.getUsuarioId();
    }

    public void setUsuarioId(Usuario usuarioId) {
        this.id.setUsuarioId(usuarioId);
    }

    public Cuadernillo getCuadernilloId() {
        return id.getCuadernilloId();
    }

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

    public EventId(Usuario usuarioId, Cuadernillo cuadernilloId) {
        this.usuarioId = usuarioId;
        this.cuadernilloId = cuadernilloId;
    }

    public EventId() {
    }

    public Usuario getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Usuario usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Cuadernillo getCuadernilloId() {
        return cuadernilloId;
    }

    public void setCuadernilloId(Cuadernillo cuadernilloId) {
        this.cuadernilloId = cuadernilloId;
    }

}
