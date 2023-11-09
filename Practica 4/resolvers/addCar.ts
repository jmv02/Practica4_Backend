// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { CarModel } from "../db/Car.ts";

export const addCar = async (req: Request, res: Response) => {
    const {modelo,price,matricula} = req.body;
    if(!modelo){
        res.status(400).send("Missing fields: modelo");
        return;
    }
    if (!matricula) {
        res.status(400).send("Falta matricula");
        return;
    }
    if(!price){
        res.status(400).send("Falta precio"); 
        return;
    }
    //Comprobamos que los tipos sean correctos
    if (typeof modelo !== "string" || typeof price !== "number" ||typeof matricula !== "string"){ 
        res.status(400).send("Los tipos de modelo,precio o matricula son incorrectos\n")
        return;
    }
    try{

        const newCar = new CarModel({
            modelo,
            price,
            matricula,
        });

        await newCar.save();
        res.status(200).send({
            modelo:newCar.modelo,
            price:newCar.price,
            matricula:newCar.matricula,  
        });
    }catch(error){
        res.status(400).send(error.message ("Problema guardando data en Mongo"));
        return;
        };
};