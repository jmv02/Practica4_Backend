// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { ConcesionarioModel } from "../db/Concesionario.ts";

export const addConcesionario = async (req: Request, res: Response) => {
    const {name_concesionario,bloqueado,concesionario} = req.body;
    if (!name_concesionario) {
        res.status(400).send("Missing fields: nombre");
        return;
    }
    if (!concesionario) {
        res.status(400).send("Faltan  concesionario");
        return;
    }
    if (bloqueado === undefined || bloqueado === null) {
        res.status(400).send("¿Bloqueo?");
        return;
    }
    //Comprobamos que los tipos sean correctos
    if (typeof name_concesionario !== "string" || typeof concesionario !== "object" || typeof bloqueado !== "boolean") {
        res.status(400).send("Los tipos de name_concesionario,precio o bloequeado son incorrectos\n")
        return;
    }
    try {

        const newConcesionario = new ConcesionarioModel({
            name_concesionario,
            concesionario,
            bloqueado,
        });

        await newConcesionario.save();
        res.status(200).send({
            name_concesionario: newConcesionario.name_concesionario,
            bloqueado: newConcesionario.bloqueado,
            concesionario: newConcesionario.concesionario,
        });
    } catch (error) {
        res.status(400).send(error.message);
        return;
    };
};