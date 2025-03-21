import { Request, Response } from 'express';
import { Domicilio } from '../../models/domicilio';

export class GetDomicilioController {
    constructor() { }
    async run(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            if (!id) {
                res.status(400).send({
                    status: "error",
                    message: "Fill all the form field",
                });
                return;
            }

            const domicilio = await Domicilio.findByPk(id);
            if (!domicilio) {
                res.status(404).send({ message: 'Product not found' });
                return
            }

            res.status(200).send(domicilio);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching product', error });
        }
    }
};