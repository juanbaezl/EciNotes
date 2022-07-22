package co.edu.escuelaing.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {
    @Id
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "passwd", nullable = false)
    private String passwd;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "programa", nullable = false)
    private String programa;

    /**
     * Constructor de la clase Usuario
     */
    public Usuario() {

    }

    /**
     * Constructor de la clase Usuario
     *
     * @param id       Long id del usuario
     * @param username String username del usuario
     * @param passwd   String contraseña del usuario
     * @param nombre   String nombre del usuario
     * @param programa String programa del usuario
     */
    public Usuario(Long id, String username, String passwd, String nombre, String programa) {
        this.id = id;
        this.username = username;
        this.passwd = passwd;
        this.nombre = nombre;
        this.programa = programa;
    }

    /**
     * Metodo getter id de la clase Usuario
     *
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * Metodo setter id de la clase Usuario
     *
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Metodo getter username de la clase Usuario
     *
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Metodo setter username de la clase Usuario
     *
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Metodo getter passwd de la clase Usuario
     *
     * @return the passwd
     */
    public String getPasswd() {
        return passwd;
    }

    /**
     * Metodo setter passwd de la clase Usuario
     *
     * @param passwd the passwd to set
     */
    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    /**
     * Metodo getter nombre de la clase Usuario
     *
     * @return the nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Metodo setter nombre de la clase Usuario
     *
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Metodo getter programa de la clase Usuario
     *
     * @return the programa
     */
    public String getPrograma() {
        return programa;
    }

    /**
     * Metodo setter programa de la clase Usuario
     *
     * @param programa the programa to set
     */
    public void setPrograma(String programa) {
        this.programa = programa;
    }

    /**
     * Metodo toString de la clase Usuario
     *
     * @return the toString
     */
    @Override
    public String toString() {
        return "{\"id\":\"" + id + "\",\"name\":\"" + nombre + "\"}";
    }

}
