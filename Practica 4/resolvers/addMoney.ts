//@ts-expect-error
import {Request,Response} from "npm:express@4.18.2"
import { ClientModel } from "../db/Cliente.ts";
import mongoose from "npm:mongoose@7.6.4";

export const addMoney = async(req:Request,res:Response) => {
    try{
    const {id_cliente,dinero} = req.params;
    if(!id_cliente || !dinero){
        res.status(400).send("Falta el id del cliente o dinero a añadir"); 
        return;
    }
   

    const id_client = new mongoose.Types.ObjectId(id_cliente); 
    const cliente = await ClientModel.findOne(id_client).exec(); 
    
    if(!cliente){
        res.status(400).send("No se encuentra dicho cliente"); 
        return; 
    }
    cliente.cartera = cliente.cartera +dinero; 
    
    await cliente.save(); 
    res.status(200).send("Se ha añadido " + dinero + " euros al cliente"); 
    }catch(e){
        res.status(400).send(e.message); 
    }
}