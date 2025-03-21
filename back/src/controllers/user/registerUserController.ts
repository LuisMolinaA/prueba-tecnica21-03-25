import { Request, Response } from "express";
import { authService } from "../../auth/authValidate";

export class RegisterUserController {
    async run(req: Request, res: Response): Promise<void>{
        try {
            const { email, password, permisos } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: "Email y contraseña son requeridos" });
            }

            const newUser = await authService.register(email, password, permisos);
            res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}
