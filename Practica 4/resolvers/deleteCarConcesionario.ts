//@ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { ConcesionarioModel } from "../db/Concesionario.ts";
import { CarModel } from "../db/Car.ts";
import mongoose from "npm:mongoose@7.6.4"; 

export const deleteCarConcesionario = async (req: Request, res: Response) => {
    try {
        const { id_concesionario, id_coche } = req.params;

        if (!id_concesionario || !id_coche) {
            res.status(400).send("Falta el id del concesionario o el del coche");
            return;
        }
        const car_id = new mongoose.Types.ObjectId(id_coche); 
        const id_con = new mongoose.Types.ObjectId(id_concesionario); 
        const concesionario = await ConcesionarioModel.findOne(id_con).exec();
        const car = await CarModel.findOne(car_id).exec();

        if (!concesionario || !car) {
            res.status(400).send("No se pudo encontrar el concesionario o el coche");
            return;
        }

        try {
            const pos = concesionario.concesionario.indexOf(car);
            concesionario.concesionario.splice(pos, 1);
            await concesionario.save(); 
            
            res.status(200).send("Coche borrado correctamente del concesionario");
        } catch (e) {
            res.status(400).send(e.message("Fallo al borrar coche de concesionario"));
        }
    } catch (e) {
        res.status(400).send(e.message("Ha habido un error al borrar el coche del concesionario"));
    }
}
