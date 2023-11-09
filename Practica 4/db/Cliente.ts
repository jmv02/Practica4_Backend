import mongoose from "npm:mongoose@7.6.3"
import { Cliente } from "../types.ts";


const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: { type: String, required: true },
    cartera:{type:Number, required:true},
    coches: { type: Array<mongoose.Schema.Types.ObjectId>, ref: "Coche" ,required:true}
});


export type ClientModelType = mongoose.Document & Omit<Cliente, "id">
export const ClientModel = mongoose.model<ClientModelType>(
    "Cliente", clientSchema,
);


