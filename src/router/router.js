import { Router } from "express";

import authMiddleware from "../app/middlewares/auth";
import sessions from "../app/controller/Sessions";
import users from "../app/controller/Users";
import areas from "../app/controller/Area";
import profiles from "../app/controller/Profile";
import levels from "../app/controller/Level";
// import cargos from "../app/controller/Cargo";

const routes = new Router();
// sessions
routes.post("/sessions", sessions.create);

// MICROSERVIÇO - CARGO E SALARIO
// AREAS
routes.get("/api/cs/areas/", areas.index);
routes.get("/api/cs/areas/:id", areas.show);
routes.post("/api/cs/areas/", areas.create);
routes.put("/api/cs/areas/:id", areas.update);
routes.delete("/api/cs/areas/:id", areas.destroy);

// PROFILES
routes.get("/api/cs/profiles/", profiles.index);
routes.get("/api/cs/profiles/:id", profiles.show);
routes.post("/api/cs/profiles/", profiles.create);
routes.put("/api/cs/profiles/:id", profiles.update);
routes.delete("/api/cs/profiles/:id", profiles.destroy);

// LEVELS
routes.get("/api/cs/levels/", levels.index);
routes.get("/api/cs/levels/:id", levels.show);
routes.post("/api/cs/levels/", levels.create);
routes.put("/api/cs/levels/:id", levels.update);
routes.delete("/api/cs/levels/:id", levels.destroy);

routes.use(authMiddleware);

// users
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

export default routes;
