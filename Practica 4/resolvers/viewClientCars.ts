
import { ConcesionarioModel } from "../db/Concesionario.ts";
// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.4";
import { ClientModel } from "../db/Cliente.ts";
export const viewClientCars = async (req: Request, res: Response) => {
    try {
        const { id_cliente } = req.params;
        if (!id_cliente) {
            res.status(400).send("Es necesario el id del cliente");
            return;
        }
        const id_client = new mongoose.Types.ObjectId(id_cliente);
        const cliente = await ClientModel.findOne(id_client).exec();

        if (!cliente) {
            res.status(400).send("No existe cliente");
            return;
        }

        res.status(200).send(
            cliente.coches, 
        );


    } catch (e) {
        res.status(400).send(e.message("Error viendo los coches del cliente"))
        return;
    }
}