import { Request, Response } from 'express';
import { Domicilio } from '../../models/domicilio';

export class DeleteDomicilioController {
    constructor() { }
    async run(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { newStatus } = req.body;

        try {
            if (!id) {
                res.status(400).send({
                    status: "error",
                    message: "Fill all the form field",
                    body: req.body
                });
                return;
            }
            const domicilio = await Domicilio.findByPk(id);
            if (!domicilio) {
                res.status(404).send({ message: 'domicilio not found' });
                return
            }

            await domicilio.update({
                Activo:newStatus
            });

            res.status(200).send(domicilio);
        } catch (error) {
            res.status(500).send({ message: 'Error updating domicilio', error });
        }
    }
};