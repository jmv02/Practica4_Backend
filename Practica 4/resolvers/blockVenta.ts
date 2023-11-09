//@ts-expect-error
import { Response, Request } from "npm:express@4.18.2";
import { ConcesionarioModel } from "../db/Concesionario.ts";
import mongoose from "npm:mongoose@7.6.4"

export const blockventa = async (req: Request, res: Response) => {
    try {
        const {id_concesionario,bloqueado} = req.params; 

        if (!id_concesionario || !bloqueado) {
            res.status(400).send("Falta el id del concesionario y el valor del bloqueo");
        }

        const id = new mongoose.Types.ObjectId(id_concesionario); 
        const concesionario = await ConcesionarioModel.findOne(id).exec();

        if (!concesionario) {
            res.status(400).send("No se encuentra el concesionario");
            return;
        }

        concesionario.bloqueado = bloqueado;
        await concesionario.save();
        res.status(200).json("Se ha cambiado el bloqueo de la venta en el concesionario"); 
    } catch (e) {
        res.status(400).send(e.message);
    }
}