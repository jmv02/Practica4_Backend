import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import { addCar } from "./resolvers/addCar.ts";
import { addCliente } from "./resolvers/addCliente.ts";
import { addConcesionario } from "./resolvers/addConcesionario.ts";
import { viewCars } from "./resolvers/viewCars.ts";
import { sendCar } from "./resolvers/sendCar.ts";
import { deleteCarConcesionario } from "./resolvers/deleteCarConcesionario.ts";
import { deleteCarClient } from "./resolvers/deleteCarCliente.ts";
import { addMoney } from "./resolvers/addMoney.ts";
import { blockventa } from "./resolvers/blockVenta.ts";
import { viewClientCars } from "./resolvers/viewClientCars.ts";
import { venderCoche } from "./resolvers/venderCoche.ts";
import { moveCar } from "./resolvers/moveCar.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL || MONGO_URL === undefined) {
  console.log("No mongo URL found");

}else{

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
await mongoose.connect(MONGO_URL);
app.post("/concesionario/cochenuevo", addCar);
app.post("/concesionario/clientenuevo", addCliente);
app.post("/concesionario/concesionarionuevo", addConcesionario);
app.put("/send/:id_coche/:id_concesionario", sendCar);
app.get("/viewConcesionario/:id_concesionario/coches", viewCars);
app.get("/cliente/coches/:id_cliente", viewClientCars);
app.delete("/concesionario/:id_concesionario/:id_coche", deleteCarConcesionario)
app.delete("/cliente/:id_cliente/:id_coche", deleteCarClient);
app.put("/venderCoche/:id_cliente/:id_coche/:id_concesionario", venderCoche)
app.put("/concesionario/:id_cliente/:dinero", addMoney)
app.put("/block/:id_concesionario/:bloqueado", blockventa)
app.put("/move/:id_cliente1/:id_cliente2/:id_car", moveCar)


  app.listen(3000, () => {
  console.log("Server listening on port 3000");
  });
}