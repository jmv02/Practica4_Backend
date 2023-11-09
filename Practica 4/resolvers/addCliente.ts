// @ts-expect-error
import {Request,Response} from "npm:express@4.18.2"
import { ClientModel } from "../db/Cliente.ts"
import { CarModel } from "../db/Car.ts";


export const addCliente = async(req:Request,res:Response) => {
    const {name,cartera,coches} = req.body; 

    if(!name || !cartera || !coches){
        res.status(400).send("Missing fields: name,cartera,coche\n"); 
        return;
    }
    if(typeof name !== "string" || typeof cartera !== "number" ){
        res.status(400).send("Tipos de nombre y cartera incorrectos\n"); 
    }
try{
    const newClient = new ClientModel({
        name,
        cartera,
        coches
    });

    await newClient.save(); 
    res.status(200).send({
        name:newClient.name_cliente,
        cartera:newClient.cartera,
        coches:newClient.coches,
    });
}catch(e){
    res.status(400).send(e.message)
    }
}