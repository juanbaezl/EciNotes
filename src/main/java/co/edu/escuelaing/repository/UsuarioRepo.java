package co.edu.escuelaing.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import co.edu.escuelaing.entities.Usuario;

@Repository
public interface UsuarioRepo extends JpaRepository<Usuario, Long> {

    @Query("Select u from Usuario u where u.username = :username and u.passwd = :passwd")
    Optional<Usuario> findByName(@Param("username") String username, @Param("passwd") String passwd);

    @Query("Select u from Usuario u where u.id != :id order by u.id")
    List<Usuario> getUsersMinusId(@Param("id") Long id);

    @Query("Select u from Usuario u where u.username = :username")
    Optional<Usuario> findByUsername(@Param("username") String username);
}
