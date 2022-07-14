package co.edu.escuelaing.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "cuadernillo")
public class Cuadernillo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "administrador", nullable = false)
    private Usuario administrador;

    @Column(name = "nombre", unique = true, nullable = false)
    private String nombre;

    @Column(name = "tablero", nullable = false)
    private String tablero;

    @Column(name = "publico", nullable = false)
    private boolean publico;

    @Column(name = "editable", nullable = false)
    private boolean editable;

    @ManyToOne
    @JoinColumn(name = "materias", nullable = false)
    private Materias materias;

    public Cuadernillo() {
    }

    public Cuadernillo(Long id, Usuario administrador, String nombre, String tablero, boolean publico, boolean editable,
            Materias materias) {
        this.id = id;
        this.administrador = administrador;
        this.nombre = nombre;
        this.tablero = tablero;
        this.publico = publico;
        this.editable = editable;
        this.materias = materias;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getAdministrador() {
        return administrador;
    }

    public void setAdministrador(Usuario administrador) {
        this.administrador = administrador;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTablero() {
        return tablero;
    }

    public void setTablero(String tablero) {
        this.tablero = tablero;
    }

    public boolean isPublico() {
        return publico;
    }

    public void setPublico(boolean publico) {
        this.publico = publico;
    }

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    public Materias getMaterias() {
        return materias;
    }

    public void setMaterias(Materias materias) {
        this.materias = materias;
    }

}
