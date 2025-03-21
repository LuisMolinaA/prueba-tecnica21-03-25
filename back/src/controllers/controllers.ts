import { RegisterUserController } from "./user/registerUserController";
import { CreateDomicilioController } from "./domicilio/createDomicilioController";
import { ListDomiciliosController } from "./domicilio/getAllDomiciliosController";
import { GetDomicilioController } from "./domicilio/getDomicilio";
import { DeleteDomicilioController } from "./domicilio/deleteDomicilioController";
import { GetMunicipiosController } from "./estadosYmunicipios/getMunicipiosController";
import { GetEstadosController } from "./estadosYmunicipios/getEstadosController";

export const registerUserController: RegisterUserController = new RegisterUserController();
export const createDomicilioController: CreateDomicilioController= new CreateDomicilioController();
export const getDomiciliosController : ListDomiciliosController = new ListDomiciliosController();
export const getDomicilioController : GetDomicilioController = new GetDomicilioController();
export const deleteDomicilioController : DeleteDomicilioController = new DeleteDomicilioController();
export const getEstadosController : GetEstadosController = new GetEstadosController();
export const getMunicipiosController : GetMunicipiosController = new GetMunicipiosController();