import mongoose from "npm:mongoose@7.6.3"
import { Car } from "../types.ts";

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    modelo: { type: String,required: true },
    matricula:{type:String, required:true,unique:true},
    price:{type:Number, required:true}
});


export type CarModelType = mongoose.Document & Omit<Car, "id">
export const CarModel = mongoose.model<CarModelType>(
    "Coches", CarSchema,
);