// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2"
import { ClientModel } from "../db/Cliente.ts";

export const viewClientCars = async (req: Request, res: Response) => {
    try {
        const { id_cliente } = req.params;
        if (!id_cliente) {
            res.status(400).send("Es necesario el id del cliente");
            return;
        }

        const cliente = await ClientModel.findOne(id_cliente).exec();

        if (!cliente) {
            res.status(400).send("No existe cliente");
            return;
        }

        res.status(200).send(
            cliente.coches,
        );


    } catch (e) {
        res.status(400).send(e.message("Error viendo los coches del concesionario"))
        return;
    }
}