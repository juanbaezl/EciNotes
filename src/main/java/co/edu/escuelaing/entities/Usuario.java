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

    public Usuario() {

    }

    public Usuario(Long id, String username, String passwd, String nombre, String programa) {
        this.id = id;
        this.username = username;
        this.passwd = passwd;
        this.nombre = nombre;
        this.programa = programa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrograma() {
        return programa;
    }

    public void setPrograma(String programa) {
        this.programa = programa;
    }

    @Override
    public String toString() {
        return "{\"id\":\"" + id + "\",\"name\":\"" + nombre + "\"}";
    }

}
