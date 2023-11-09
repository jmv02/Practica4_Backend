import mongoose from "npm:mongoose@7.6.3"
import { Concesionario } from "../types.ts";


const Schema = mongoose.Schema;

const concesionarioSchema = new Schema({
    name_concesionario: { type: String, required: true },
    bloqueado: {type:Boolean,required:true},
    //cliente: {type:Array<mongoose.Schema.Types.ObjectId>, ref:"Cliente"},
    concesionario: { type: Array<mongoose.Schema.Types.ObjectId>, ref: "Coche", required: true },
});


export type ConcesionarioModelType = mongoose.Document & Omit<Concesionario, "id">
export const ConcesionarioModel = mongoose.model<ConcesionarioModelType>(
    "Concesionario", concesionarioSchema,
);


    