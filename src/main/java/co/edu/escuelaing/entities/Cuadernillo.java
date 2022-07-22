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

    @Column(name = "tablero", nullable = false, columnDefinition = "TEXT")
    private String tablero;

    @Column(name = "publico", nullable = false)
    private boolean publico;

    @Column(name = "editable", nullable = false)
    private boolean editable;

    @ManyToOne
    @JoinColumn(name = "materias", nullable = false)
    private Materias materias;

    /**
     * Constructor de la clase Cuadernillo
     */
    public Cuadernillo() {
    }

    /**
     * Constructor de la clase Cuadernillo
     *
     * @param id            Long id del cuadernillo
     * @param administrador Usuario administrador del cuadernillo
     * @param nombre        String nombre del cuadernillo
     * @param tablero       String tablero del cuadernillo
     * @param publico       boolean indica si el cuadernillo es publico o no
     * @param editable      boolean indica si el cuadernillo es editable o no
     * @param materias      Materias materia del cuadernillo
     * 
     */
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

    /**
     * Constructor de la clase Cuadernillo
     *
     * @param administrador Usuario administrador del cuadernillo
     * @param nombre        String nombre del cuadernillo
     * @param tablero       String tablero del cuadernillo
     * @param publico       boolean indica si el cuadernillo es publico o no
     * @param editable      boolean indica si el cuadernillo es editable o no
     * @param materias      Materias materia del cuadernillo
     * 
     */
    public Cuadernillo(Usuario administrador, String nombre, String tablero, boolean publico, boolean editable,
            Materias materias) {
        this.administrador = administrador;
        this.nombre = nombre;
        this.tablero = tablero;
        this.publico = publico;
        this.editable = editable;
        this.materias = materias;
    }

    /**
     * Metodo getter id de la clase Cuadernillo
     *
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * Metodo setter id de la clase Cuadernillo
     *
     * @param id Long id del cuadernillo
     * 
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Metodo getter administrador de la clase Cuadernillo
     *
     * @return administrador
     * 
     */
    public Usuario getAdministrador() {
        return administrador;
    }

    /**
     * Metodo setter administrador de la clase Cuadernillo
     *
     * @param administrador Usuario administrador del cuadernillo
     * 
     */
    public void setAdministrador(Usuario administrador) {
        this.administrador = administrador;
    }

    /**
     * Metodo getter nombre de la clase Cuadernillo
     *
     * @return nombre
     * 
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Metodo setter nombre de la clase Cuadernillo
     *
     * @param nombre String nombre del cuadernillo
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Metodo getter tablero de la clase Cuadernillo
     *
     * @return tablero
     */
    public String getTablero() {
        return tablero;
    }

    /**
     * Metodo setter tablero de la clase Cuadernillo
     *
     * @param tablero String tablero del cuadernillo
     *
     */
    public void setTablero(String tablero) {
        this.tablero = tablero;
    }

    /**
     * Metodo getter publico de la clase Cuadernillo
     *
     * @return publico
     */
    public boolean isPublico() {
        return publico;
    }

    /**
     * Metodo setter publico de la clase Cuadernillo
     *
     * @param publico boolean indica si el cuadernillo es publico o no
     */
    public void setPublico(boolean publico) {
        this.publico = publico;
    }

    /**
     * Metodo getter editable de la clase Cuadernillo
     *
     * @return editable
     */
    public boolean isEditable() {
        return editable;
    }

    /**
     * Metodo setter editable de la clase Cuadernillo
     *
     * @param editable boolean indica si el cuadernillo es editable o no
     *
     */
    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    /**
     * Metodo getter materias de la clase Cuadernillo
     *
     * @return materias
     */
    public Materias getMaterias() {
        return materias;
    }

    /**
     * Metodo setter materias de la clase Cuadernillo
     *
     * @param materias Materias materia del cuadernillo
     */
    public void setMaterias(Materias materias) {
        this.materias = materias;
    }

    /**
     * Metodo toString de la clase Cuadernillo
     *
     * @return String
     */
    @Override
    public String toString() {
        return "{\"id\":\"" + id + "\",\"admin\":\"" + administrador.getId() + "\",\"nombre\":\"" + nombre
                + "\",\"tablero\":\""
                + tablero + "\",\"publico\":\""
                + publico + "\",\"editable\":\"" + editable + "\",\"materias\":\"" + materias.getId() + "\"}";
    }
}
