import { Request, Response } from 'express';
import { Estado } from '../../models/estados';

export class GetEstadosController {
    constructor() { }
    async run(req: Request, res: Response): Promise<void> {
        try {

            const estados = await Estado.findAll();
            if (!estados) {
                res.status(404).send({ message: 'Product not found' });
                return
            }

            res.status(200).send(estados);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching product', error });
        }
    }
};