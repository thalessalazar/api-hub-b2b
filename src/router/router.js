import { Router } from "express";

import authMiddleware from "../app/middlewares/auth";
import sessions from "../app/controller/Sessions";
import users from "../app/controller/Users";

const routes = new Router();
// sessions
routes.post("/sessions", sessions.create);

routes.use(authMiddleware);

// users
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

export default routes;
