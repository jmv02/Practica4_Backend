// @ts-expect-error
import {Request,Response} from "npm:express@4.18.2"; 
import { ClientModel } from "../db/Cliente.ts";
import { CarModel } from "../db/Car.ts";
import { ConcesionarioModel } from "../db/Concesionario.ts";
import mongoose from "npm:mongoose@7.6.4";

export const venderCoche = async(req:Request,res:Response) => {
try{
    const {id_cliente, id_coche,id_concesionario} = req.params; 

    if(!id_cliente || !id_coche || !id_concesionario){
        res.status(400).send("Faltan los ids del coche,del cliente y del concesionario"); 
        return; 
    }

    const id_client = new mongoose.Types.ObjectId(id_cliente);
    const car_id = new mongoose.Types.ObjectId(id_coche); 
    const id_con = new mongoose.Types.ObjectId(id_concesionario); 



    const cliente = await ClientModel.findOne(id_client).exec(); 
    const car = await CarModel.findOne(car_id).exec(); 
    const concesionario = await ConcesionarioModel.findOne(id_con).exec();


    if (!cliente ||!car || !concesionario) {
        res.status(400).send("No se ha encontrado el cliente,el coche o el concesionario");
        return;
    }
    if(concesionario.bloqueado === false){
        if (cliente.cartera < car.price) {
            res.status("not_enough_money").send("The customer does not have enough money to perform the transaction");
        } else {
            const pos = concesionario.concesionario.indexOf(car); 
            concesionario.concesionario.splice(pos,1); 
            await concesionario.save(); 
            
            cliente.coches.push(car);
            cliente.cartera = cliente.cartera - car.price;
            await cliente.save(); 
            res.status(200).send("Coche vendido"); 
        }

    }else{
        res.status(400).send("Ese concesionario tiene la venta bloqueada"); 
    }

}catch(e){
    res.status(400).send(e.message("Error durante la venta del coche")); 
}

}