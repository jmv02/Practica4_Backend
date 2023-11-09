//@ts-expect-error
import {Request,Response} from "npm:express@4.18.2"; 
import { ClientModel } from "../db/Cliente.ts";
import { CarModel } from "../db/Car.ts";
import mongoose from "npm:mongoose@7.6.4"; 


export const moveCar = async(req:Request,res:Response)=> {
    try{
        const {id_cliente1,id_cliente2,id_coche} = req.body; 

        if(!id_cliente1 ||!id_cliente2|| id_coche) {
            res.status(400).send("Falta el id de los clientes o del coche"); 
            return; 
        }
        const id_1 = new mongoose.Types.ObjectId(id_cliente1); 
        const id_2 = new mongoose.Types.ObjectId(id_cliente2); 
        const cliente1 = await ClientModel.findOne(id_1).exec(); 
        const cliente2 = await ClientModel.findOne(id_2).exec(); 
        const car = await CarModel.findOne(id_coche).exec(); 
        

        if(!cliente1 ||!cliente2 || !car){
            res.status(400).send("No se encuentran los clientes o el coche");
            return; 
        }

        try{    
            const pos = cliente1.coches.indexOf(car); 
            cliente1.coches.splice(pos,1); cliente1.cartera = cliente1.cartera + car.price; 
            cliente2.coches.push(car); cliente2.cartera = cliente2.cartera - car.price; 
            
            await cliente1.save(); 
            await cliente2.save(); 

        }catch(e){
            res.status(400).send(e.message); 
            return; 
        }


    }catch(e){
        res.status(400).send(e.message); 
    }
}