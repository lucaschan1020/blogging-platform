# Prerequisite:

[Docker](https://www.docker.com/)

# Steps to run

1. Rename the `.env.example` to `.env` in two directories (`./blogging-platform/.env.example` and `./mysql/.env.example`).
2. The credentials and configurations are inside the `.env`, please read it and feel free to change the value as needed.
3. There are two version of `docker-compose` and `Dockerfile`, `dev` version is specifically for local development, supports server reload on file save and runs on TypeScript. As for non `dev` is a deployment version, it has already transpiled to JavaScript. Execute the command `docker compose -f "docker-compose.dev.yaml" up -d --build` for `dev` version or `docker compose -f "docker-compose.yaml" up -d --build` for non `dev` version.
4. Create a new schema `blogging-platform` if it is not created. Use your preferred choice of MySQL client to access database at port `3306`, default password is `12345678` as stated in `./mysql/.env`.
5. To generate the database tables, remote access into the container and execute the command `npm run migration:run` for `dev` version and `npx typeorm migration:run -d ./typeorm.config.js` for non `dev` version.
6. Restart the backend container once again to make sure it is properly connected to database.
7. Execute the command `docker compose -f "docker-compose.dev.yaml" down` for `dev` version or `docker compose -f "docker-compose.yaml" down` for non `dev` version to shutdown.

# Note

- Database port is opened at `3306`
- Backend server port is open at `3000`, Swagger documentation is accessible at `/api`
- To access protected REST endpoints, please provide the token in the HTTP Header `Authorization: Bearer yourJwtToken`
