package co.edu.escuelaing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "co.edu.escuelaing" })
public class WebSiteController {

    /**
     * Metodo que inicia el servidor
     * 
     * @param args argumentos de entrada
     *
     */
    public static void main(String[] args) {
        SpringApplication.run(WebSiteController.class, args);
    }
}
