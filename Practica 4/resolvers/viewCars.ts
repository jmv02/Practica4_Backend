
import { ConcesionarioModel } from "../db/Concesionario.ts";
// @ts-expect-error
import {Request,Response} from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.4";
export const viewCars = async(req:Request,res:Response) => {
try{
    const {id_concesionario} = req.params;
    if(!id_concesionario){
        res.status(400).send("Es necesario el id del concesionario"); 
        return;
    } 
    const id_con = new mongoose.Types.ObjectId(id_concesionario); 
    const concesionario = await ConcesionarioModel.findOne(id_con).exec(); 

    if(!concesionario){
        res.status(400).send("No existe concesionario"); 
        return;
    }

    res.status(200).send(
        concesionario.concesionario,
    ); 


}catch(e){
    res.status(400).send(e.message("Error viendo los coches del concesionario"))
    return; 
}
}