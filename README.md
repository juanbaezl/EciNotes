[![CircleCI](https://dl.circleci.com/status-badge/img/gh/juanbaezl/EciNotes/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/juanbaezl/EciNotes/tree/main)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1d7e713e733d4ab1b811b70f09bd3320)](https://www.codacy.com/gh/juanbaezl/EciNotes/dashboard?utm_source=github.com&utm_medium=referral&utm_content=juanbaezl/EciNotes&utm_campaign=Badge_Grade)

# Titulo

ECI Notes

## Descripción

ECI Notes es una aplicación web la cual le permitirá realizar apuntes colaborando en tiempo real junto a sus compañeros, esto con el fin de que sus apuntes sean más completos.

También en caso de querer estos apuntes serán guardados en un repositorio global, con el fin de que otros usuarios de la ECI puedan usar estos.

El proyecto lo puede ver en el siguiente link:
[App Eci Notes](https://ecinotes.herokuapp.com/)

### LOC/h

Para este taller se hicieron 936 líneas de código, en 52 horas.

**18 LOC/h**

### Prerrequisitos

Para correr este se debe tener instalado:

- Maven
- Java

### Guía de uso

Para compilar el proyecto se debe usar:

```
mvn package
```

Para ejecutarlo, se debe hacer de la siguiente forma

```
$ java -jar target/ECINotes-1.0.jar
```

Este le iniciará la página en su localhost con puerto 5000.

## Documentación

Para visualizar la documentación se debe ejecutar el siguiente comando:

```
mvn javadoc:javadoc
```

Una vez se realice este comando, se debe buscar en la siguiente ruta "target\site\apidocs\index.html".

## Estructura de Archivos

    .
    |____pom.xml
    |____src
    | |____main
    | | |____java
    | | | |____co
    | | | | |____edu
    | | | | | |____escuelaing
    | | | | | | |____configurator
    | | | | | | | |____CollabTableroWebSocketConfig.java
    | | | | | | |____controller
    | | | | | | | |____WebSiteController.java
    | |____resources
    | | |____static
    | | | |____js
    | | | | |____fabric.js
    | | | | |____FirstComponent.js
    | | | | |____home.js
    | | | | |____index.js
    | | | | |____sketch.js
    | | | |____css
    | | | | |____style.css
    | | | | |____home.css
    | | | | |____index.css
    | | | |____status.html
    | | | |____home.html
    | | | |____index.html
    | | | |____tablero.html

![Diagrama de Clases](img/Diagrama_de_Paquetes.png)

## Diagramas de Clases

### Controller

![Diagrama de Clases](img/Diagrama_de_Clases_Controller.png)

### Configurator

![Diagrama de Clases](img/Diagrama_de_Clases_Configurator.png)

## Autor

- **Juan Carlos Baez Lizarazo** - [juanbaezl](https://github.com/juanbaezl)

## Licencia

Para más información ver: [LICENSE.txt](License.txt)
