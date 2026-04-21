# Eagle Leap Spring Boot Reference

This folder provides the Spring Boot structure requested alongside the primary Node.js backend.

Recommended package responsibilities:

- `config`: application, CORS, and infrastructure configuration.
- `security`: JWT filters, authentication entry point, RBAC rules.
- `controller`: REST controllers for auth, CMS, store, publications, leads, and dashboards.
- `service`: business services for publishing workflows, orders, notifications, and reporting.
- `repository`: Spring Data JPA repositories mapped to the MySQL schema from the next step.
- `entity`: JPA entities mirroring users, publications, orders, call_for_papers, and related tables.
- `dto`: request/response DTOs used to keep controller contracts stable.

The implemented Node backend in `apps/api-node` is the active backend for this project. This Spring Boot folder is a parallel architecture scaffold so the project can be ported or expanded into Java later without redesigning the domain model.
