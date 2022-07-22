package co.edu.escuelaing.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "materias")
public class Materias implements Serializable {

    @Id
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    /**
     * Constructor de la clase Materias
     */
    public Materias() {
    }

    /**
     * Constructor de la clase Materias
     *
     * @param id
     * @param nombre
     */
    public Materias(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    /**
     * Metodo getter id de la clase Materias
     * 
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * Metodo setter id de la clase Materias
     * 
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Metodo getter nombre de la clase Materias
     * 
     * @return the nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Metodo setter nombre de la clase Materias
     * 
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
