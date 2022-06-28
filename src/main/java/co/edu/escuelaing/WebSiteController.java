package co.edu.escuelaing;

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

    @GetMapping("/getcolor")
    public String getColor() {
        String color = (String) request.getSession().getAttribute("color");
        return "{\"color\":\"" + color + "\"}";
    }

    @GetMapping("/delname")
    public void delName() {
        request.getSession().removeAttribute("name");
        request.getSession().removeAttribute("color");
    }

    @GetMapping("/setname")
    public String setName(@RequestParam(value = "name", defaultValue = "Anónimo") String name,
            @RequestParam(value = "color", defaultValue = "black") String color) {
        request.getSession().setAttribute("name", name);
        request.getSession().setAttribute("color", color);
        return "{\"response\":\"Hello " + name + "!\"}";
    }

    @GetMapping("/getname")
    public String getName() {
        String name = (String) request.getSession().getAttribute("name");
        String color = (String) request.getSession().getAttribute("color");
        return "{\"name\":\"" + name + "\",\n" +
                "\"color\":\"" + color + "\"}";
    }

    public void sessionManagement() {
        System.out.println(request.getSession(true).getId());
    }
}
