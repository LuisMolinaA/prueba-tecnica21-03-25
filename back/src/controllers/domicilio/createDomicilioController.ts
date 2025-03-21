import { Request, Response } from "express";
import { User } from "../../models/user";
import { Domicilio } from "../../models/domicilio";
import { Municipio } from "../../models/municipios";
import { Estado } from "../../models/estados";

export class CreateDomicilioController {
    constructor() { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const {municipioID,estadoID , colonia, domicilio, numExterior, entreCalles, activo, userId } = req.body;

            console.log("Datos recibidos en req.body:", req.body);
            if (!estadoID || !municipioID || !colonia || !domicilio || !numExterior || !entreCalles || !activo || !userId) {
                res.status(400).json({ error: "Información incompleta." });
                return;
            }

            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                res.status(404).json({ error: "Usuario no encontrado." });
                return;
            }

            const municipio = await Municipio.findOne({ where: { id: municipioID } });
            if (!municipio) {
                res.status(404).json({ error: "Municipio no encontrado." });
                return;
            }

            const estado = await Estado.findOne({ where: { id: estadoID } });

            if (!estado) {
                console.log('estado', estado)

                res.status(404).json({ error: "Estado no encontrado." });
                return;
            }

            const newDomicilio = await Domicilio.create({
                estadoID,
                municipioID,
                colonia,
                domicilio,
                numExterior,
                entreCalles,
                activo,
                usuarioCreo:userId,
            });

            res.status(201).json({
                message: "Domicilio creado correctamente.",
                data: newDomicilio,
            });
        } catch (error) {
            console.error("Error al crear domicilio:", error);
            res.status(500).json({ message: "Error interno del servidor.", error });
        }
    }
}
