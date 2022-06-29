package co.edu.escuelaing.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@ComponentScan(basePackages = { "co.edu.escuelaing" })
public class WebSiteController {

    @Resource
    private HttpServletRequest request;

    public static void main(String[] args) {
        SpringApplication.run(WebSiteController.class, args);
    }

    @GetMapping("/status")
    public String status() {
        sessionManagement();
        String name = (String) request.getSession().getAttribute("name");
        return "{\"status\":\"Greetings from Spring Boot "
                + name + ". " + java.time.LocalDate.now() + ", "
                + java.time.LocalTime.now()
                + ". " + "The server is Running!\"}";
    }

    @GetMapping("/setname")
    public void setName(@RequestParam(value = "username", defaultValue = "Anónimo") String username) {
        request.getSession().setAttribute("name", username);
    }

    @GetMapping("/getname")
    public String getName() {
        String username = (String) request.getSession().getAttribute("name");
        return "{\"name\":\"" + username + "\"}";
    }

    public void sessionManagement() {
        System.out.println(request.getSession(true).getId());
    }
}
