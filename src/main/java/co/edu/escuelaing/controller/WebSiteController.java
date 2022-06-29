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

    @GetMapping("/delname")
    public void delName() {
        request.getSession().removeAttribute("name");
        request.getSession().removeAttribute("password");
    }

    @GetMapping("/setname")
    public void setName(@RequestParam(value = "username", defaultValue = "Anónimo") String username,
            @RequestParam(value = "password", defaultValue = "") String password) {
        request.getSession().setAttribute("name", username);
        request.getSession().setAttribute("password", password);
    }

    @GetMapping("/getname")
    public String getName() {
        String username = (String) request.getSession().getAttribute("name");
        String password = (String) request.getSession().getAttribute("password");
        return "{\"name\":\"" + username + "\",\n" +
                "\"password\":\"" + password + "\"}";
    }

    public void sessionManagement() {
        System.out.println(request.getSession(true).getId());
    }
}
