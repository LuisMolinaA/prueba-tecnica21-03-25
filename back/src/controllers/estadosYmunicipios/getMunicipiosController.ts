import { Request, Response } from 'express';
import { Municipio } from '../../models/municipios';
import { Estado } from '../../models/estados';

export class GetMunicipiosController {
    constructor() { }
    async run(req: Request, res: Response): Promise<void> {
        const { estadoID } = req.query;

        try {
            if (!estadoID) {
                res.status(400).send({
                    status: "error",
                    message: "El parámetro estadoID es requerido",
                });
                return;
            }

            const estado = await Estado.findOne({ where: { id: estadoID } });
            if (!estado) {
                res.status(404).json({ error: "Estado no encontrado." });
                return;
            }

            const Municipios = await Municipio.findAll({ where: { estadoID } });
            if (Municipios.length === 0) {
                res.status(404).send({ message: 'No se encontraron municipios para el estado proporcionado' });
                return;
            }

            res.status(200).send(Municipios);
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener los municipios', error: error });
        }
    }
};
