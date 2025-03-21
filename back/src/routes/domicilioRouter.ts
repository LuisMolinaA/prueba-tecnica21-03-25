import { Router } from "express";
import passport from "../auth/auth";
import { createDomicilioController, deleteDomicilioController, getDomicilioController, getDomiciliosController, getEstadosController, getMunicipiosController } from "../controllers/controllers";

export const domicilioRouter: Router = Router();

domicilioRouter.post("/create", passport.authenticate("jwt", { session: false }), createDomicilioController.run.bind(createDomicilioController));
//todos los domicilios
domicilioRouter.get("/getDomicilios", passport.authenticate("jwt", { session: false }), getDomiciliosController.run.bind(getDomiciliosController))
//un domicilio by id por req param
domicilioRouter.get("/getDomicilio/:id", passport.authenticate("jwt", { session: false }), getDomicilioController.run.bind(getDomicilioController))

domicilioRouter.put("/deleteDomicilio/:id", passport.authenticate("jwt", { session: false }), deleteDomicilioController.run.bind(deleteDomicilioController))

domicilioRouter.get("/get/estados", passport.authenticate("jwt", { session: false }), getEstadosController.run.bind(getEstadosController))
domicilioRouter.get("/get/municipios", passport.authenticate("jwt", { session: false }), getMunicipiosController.run.bind(getMunicipiosController))
