//@ts-expect-error
import {Request,Response } from  "npm:express@4.18.2"; 
import { ClientModel } from "../db/Cliente.ts";
import { CarModel } from "../db/Car.ts";
import mongoose from "npm:mongoose@7.6.4"; 

export const deleteCarClient = async(req:Request,res:Response) => {
    try{
    const {id_cliente,id_coche} = req.params; 

    if(!id_cliente || !id_coche){
        res.status(400).send("Falta el id del cliente y del coche"); 
        return; 
    }
    const id_client = new mongoose.Types.ObjectId(id_cliente); 
    const car_id = new mongoose.Types.ObjectId(id_coche); 

    const cliente = await ClientModel.findOne(id_client).exec(); 
    const car = await CarModel.findOne(car_id).exec(); 

    if(!cliente || !car){
        res.status(400).send("No se pudo encontrar el cliente ni el coche"); 
        return; 
    }

try{
   const pos =cliente.coches.indexOf(car);
    cliente.coches.splice(pos,1);
    await cliente.save();
    res.status(200).send("Coche borrado correctamente del cliente");  

}catch(e){
    res.status(400).send(e.message("Fallo al borrar coche de cliente")); 
}
    }catch(e){
        res.status(400).send(e.message); 
    }
}
