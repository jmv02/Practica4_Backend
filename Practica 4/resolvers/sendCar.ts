import { CarModel} from "../db/Car.ts";
import { ConcesionarioModel } from "../db/Concesionario.ts";
// @ts-expect-error
import {Request,Response} from "npm:express@4.18.2"; 
import mongoose from "npm:mongoose@7.6.4"; 

export const sendCar = async(req:Request,res:Response) => {
try{
const {id_coche,id_concesionario} = req.params; 

if(!id_coche || !id_concesionario){
    res.status(400).send("Los ids de coche y concesionario son necesarios");
    return; 
}
const id_c = new mongoose.Types.ObjectId(id_coche); 
const id_con = new mongoose.Types.ObjectId(id_concesionario); 
const car = await CarModel.findOne(id_c).exec(); 
const concesionario = await ConcesionarioModel.findOne(id_con).exec(); 

if (!car ||!concesionario) {
    res.status(400).send("No se ha encontrado el coche o concesionario");
    return;
}

if(concesionario.concesionario.length > 10){
    res.status(500).send("No se pueden enviar mas coches"); 
    return;
}
concesionario.concesionario.push(car); 
await concesionario.save(); 
res.status(200).json("Se ha enviado correctamente el coche"); 
}catch(e){
    res.status(500).send(e.message); 
    }
}
