![image](https://github.com/Yassine-Karimi/secured-decorized-resources-reservation-management-App/assets/66490404/fc497448-dd96-4ae1-a10b-469c8b225a13)## Overview of the Project

This project is designed to develop a reservation management application following a microservices architecture. The primary goal is to efficiently handle reservations for various resources, with each reservation being associated with a specific resource.

A resource is characterized by its unique ID, name, and type, such as MATERIEL_INFO or MATERIEL_AUDIO_VISUEL. On the other hand, a reservation is identified by its ID, name, context, date, duration, and is initiated by a person. A person is defined by their ID, name, email, and function.

The application comprises two functional microservices:

1. **Resources-Service:** Responsible for managing resources.
2. **Reservation-Service:** Manages reservations initiated by individuals.

The technical microservices to be implemented include:

- **Service Gateway:** Built on Spring Cloud Gateway.
- **Service Discovery:** Utilizing Eureka Server.
- **Service Configuration:** Employing Spring Cloud Config.

For the overall application:

- A web frontend will be developed using the Angular framework.
- Security protocols will be based on OAuth2 and OIDC, with Keycloak serving as the identity provider.
- Microservices will generate RESTful web service documentation using the OpenAPI Specification Swagger.
- Circuit breakers, implemented through Resilience4J, will enhance fault tolerance within the system.
- 
## Outils
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](	https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Keycloak](https://img.shields.io/badge/keycloak-%23334D5E.svg?style=for-the-badge&logo=keycloak&logoColor=white)



## App Tree Architect:

```bash
├───app-ng
│   ├───.angular
│   │   └───cache
│   │       └───17.0.8
│   │           ├───angular-webpack
│   │           │   ├───37adeeb720adad8fa4ae080264c27bb01d6d29de
│   │           │   ├───408bf4a2ff9333ba12aa88d2aa40a2cdaff0ee80
│   │           │   └───6a78ae494bfa0410eaa3259b7efa0e385ca22404
│   │           └───babel-webpack
│   ├───.firebase
│   ├───.idea
│   ├───.vscode
│   ├───dist
│   │   └───app-ng
│   │       └───assets
│   │           ├───css
│   │           ├───img
│   │           └───js
│   ├───public
│   └───src
│       ├───app
│       │   ├───component
│       │   │   ├───admin-template
│       │   │   ├───client
│       │   │   │   ├───add-client
│       │   │   │   └───edit-client
│       │   │   ├───header
│       │   │   ├───reservations
│       │   │   ├───resources
│       │   │   └───welcome
│       │   ├───guards
│       │   ├───models
│       │   ├───pipes
│       │   └───services
│       └───assets
│           ├───css
│           ├───img
│           └───js
├───config-service
│   ├───.mvn
│   │   └───wrapper
│   ├───src
│   │   ├───main
│   │   │   ├───java
│   │   │   │   └───net
│   │   │   │       └───youssfi
│   │   │   │           └───configservice
│   │   │   └───resources
│   │   └───test
│   │       └───java
│   │           └───net
│   │               └───youssfi
│   │                   └───configservice
│   └───target
│       ├───classes
│       │   └───net
│       │       └───youssfi
│       │           └───configservice
│       ├───generated-sources
│       │   └───annotations
│       ├───generated-test-sources
│       │   └───test-annotations
│       ├───maven-archiver
│       ├───maven-status
│       │   └───maven-compiler-plugin
│       │       ├───compile
│       │       │   └───default-compile
│       │       └───testCompile
│       │           └───default-testCompile
│       └───test-classes
│           └───net
│               └───youssfi
│                   └───configservice
├───discovery-service
│   ├───.mvn
│   │   └───wrapper
│   ├───src
│   │   ├───main
│   │   │   ├───java
│   │   │   │   └───net
│   │   │   │       └───youssfi
│   │   │   │           └───discoveryservice
│   │   │   └───resources
│   │   └───test
│   │       └───java
│   │           └───net
│   │               └───youssfi
│   │                   └───discoveryservice
│   └───target
│       ├───classes
│       │   └───net
│       │       └───youssfi
│       │           └───discoveryservice
│       ├───generated-sources
│       │   └───annotations
│       ├───generated-test-sources
│       │   └───test-annotations
│       ├───maven-archiver
│       ├───maven-status
│       │   └───maven-compiler-plugin
│       │       ├───compile
│       │       │   └───default-compile
│       │       └───testCompile
│       │           └───default-testCompile
│       └───test-classes
│           └───net
│               └───youssfi
│                   └───discoveryservice
├───gateway-service
│   ├───.mvn
│   │   └───wrapper
│   ├───src
│   │   ├───main
│   │   │   ├───java
│   │   │   │   └───net
│   │   │   │       └───youssfi
│   │   │   │           └───gatewayservice
│   │   │   └───resources
│   │   └───test
│   │       └───java
│   │           └───net
│   │               └───youssfi
│   │                   └───gatewayservice
│   └───target
│       ├───classes
│       │   └───net
│       │       └───youssfi
│       │           └───gatewayservice
│       ├───generated-sources
│       │   └───annotations
│       ├───generated-test-sources
│       │   └───test-annotations
│       ├───maven-archiver
│       ├───maven-status
│       │   └───maven-compiler-plugin
│       │       ├───compile
│       │       │   └───default-compile
│       │       └───testCompile
│       │           └───default-testCompile
│       └───test-classes
│           └───net
│               └───youssfi
│                   └───gatewayservice
├───reservation-service
│   ├───.mvn
│   │   └───wrapper
│   ├───src
│   │   ├───main
│   │   │   ├───java
│   │   │   │   └───yas
│   │   │   │       └───kr
│   │   │   │           └───reservationservice
│   │   │   │               ├───clients
│   │   │   │               ├───dtos
│   │   │   │               ├───entities
│   │   │   │               ├───exceptions
│   │   │   │               ├───mappers
│   │   │   │               ├───model
│   │   │   │               ├───repository
│   │   │   │               ├───security
│   │   │   │               ├───services
│   │   │   │               └───web
│   │   │   └───resources
│   │   │       ├───static
│   │   │       └───templates
│   │   └───test
│   │       └───java
│   │           └───yas
│   │               └───kr
│   │                   └───reservationservice
│   └───target
│       ├───classes
│       │   └───yas
│       │       └───kr
│       │           └───reservationservice
│       │               ├───clients
│       │               ├───dtos
│       │               ├───entities
│       │               ├───exceptions
│       │               ├───mappers
│       │               ├───model
│       │               ├───repository
│       │               ├───security
│       │               ├───services
│       │               └───web
│       ├───generated-sources
│       │   └───annotations
│       ├───generated-test-sources
│       │   └───test-annotations
│       ├───maven-archiver
│       ├───maven-status
│       │   └───maven-compiler-plugin
│       │       ├───compile
│       │       │   └───default-compile
│       │       └───testCompile
│       │           └───default-testCompile
│       └───test-classes
│           └───yas
│               └───kr
│                   └───reservationservice
└───resources-service
    ├───.mvn
    │   └───wrapper
    ├───src
    │   ├───main
    │   │   ├───java
    │   │   │   └───yas
    │   │   │       └───kr
    │   │   │           └───resourcesservice
    │   │   │               ├───dtos
    │   │   │               ├───entities
    │   │   │               ├───enums
    │   │   │               ├───mappers
    │   │   │               ├───repository
    │   │   │               ├───security
    │   │   │               ├───service
    │   │   │               └───web
    │   │   └───resources
    │   └───test
    │       └───java
    │           └───yas
    │               └───kr
    │                   └───resourcesservice
    └───target
        ├───classes
        │   └───yas
        │       └───kr
        │           └───resourcesservice
        │               ├───dtos
        │               ├───entities
        │               ├───enums
        │   └───test-annotations
        ├───maven-archiver
        ├───maven-status
        │   └───maven-compiler-plugin
        │       ├───compile
        │       │   └───default-compile
        │       └───testCompile
        │           └───default-testCompile
        └───test-classes
            └───yas
                └───kr
                    └───resourcesservice
```

## Eureka Service 
<table align="center">

   <td><img src="screenshots/img.png"/></td>
  </tr>
</table>
<br>

## Config Service
<table align="center">
  <tr>
    <th>Config Architect</th>
    <th>Config Test</th>
  </tr>
  <tr>
    <td><img src="screenshots/7.png"/></td>
    <td><img src="screenshots/8.png"/></td>
  </tr>
</table>
<be>

## Gateway Service
<table align="center">
  <tr>
    <th>Gateway Architect</th>
    <th>Gateway health</th>
  </tr>
  <tr>
    <td><img src="screenshots/10.png"/></td>
    <td><img src="screenshots/9.png"/></td>
  </tr>
</table>
<be>

## Reservation Service Swagger Doc:
<table align="center">
  <tr>
    <th>Reservation Rest API</th>
    <th>Personne Rest API</th>
   </tr>
  <tr>
    <td><img src="screenshots/apireser.png"/></td>
    <td><img src="screenshots/apiper.png"/></td>
  </tr>
    <th>GET Reservation</th>
    <th>GET Person</th>
  <tr>
    <td><img src="screenshots/getreser.png"/></td>
    <td><img src="screenshots/getper.png"/></td>
  </tr>
  </tr>
    <th>GET ALL Reservations</th>
    <th>GET ALL Persons</th>
  <tr>
    <td><img src="screenshots/getallreser.png"/></td>
    <td><img src="screenshots/getallper.png"/></td>
  </tr>
     <th>PUT Reservation</th>
     <th>PUT Person</th>
  <tr>
    <td><img src="screenshots/putreser.png"/></td>
    <td><img src="screenshots/putper.png"/></td>
  </tr>
     <th>DELETE Reservation</th>
    <th>DELETE Person</th>
  <tr>
    <td><img src="screenshots/delreser.png"/></td>
    <td><img src="screenshots/delper.png"/></td>
  </tr>
     <th>POST Reservation</th>
    <th>POST Person</th>
  <tr>
    <td><img src="screenshots/postreser.png"/></td>
    <td><img src="screenshots/postper.png"/></td>
  </tr>
</table>

