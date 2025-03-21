import { Request, Response } from 'express';
import { Domicilio } from '../../models/domicilio';
import { Estado } from '../../models/estados';
import { Municipio } from '../../models/municipios';

export class ListDomiciliosController {
    constructor() { }
    async run(req: Request, res: Response): Promise<void> {
        try {
            const domicilios = await Domicilio.findAll({
                include: [
                    {
                        model: Estado,
                        attributes: ['name'],
                    },
                    {
                        model: Municipio,
                        attributes: ['name'],
                    },
                ]
            });

            if (!domicilios || domicilios.length === 0) {
                res.status(404).send({ message: 'Domicilios not found' });
                return;
            }

            res.status(200).send(domicilios);
        } catch (error) {
            console.error("Error fetching domicilios:", error);
            res.status(500).send({ message: 'Error fetching domicilios', error });
        }
    }
};
