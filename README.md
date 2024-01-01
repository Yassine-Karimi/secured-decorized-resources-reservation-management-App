## Overview of the Project

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
