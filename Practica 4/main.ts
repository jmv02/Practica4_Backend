import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
//@ts-expect-error
import express, { Request, Response } from "npm:express@4.18.2";
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
const PORT = env.PORT;
if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
  //endpoints
  //1.- Endpont para ver si estoy escuchando bien
  app.post("/concesionario/cochenuevo",addCar); 
  app.post("/concesionario/clientenuevo",addCliente); 
  app.post("/concesionario/concesionarionuevo",addConcesionario);
  app.put("/send/:id_coche/:id_concesionario",sendCar); 
  app.get("/viewConcesionario/:id_concesionario/coches",viewCars); 
  app.get("cliente/coches",viewClientCars); 
  app.delete("/concesionario/:id_concesionario/:id_coche",deleteCarConcesionario)
  app.delete("/cliente/:id_cliente/:id_coche",deleteCarClient);
  app.put("/venderCoche/:id_cliente/:id_coche/:id_concesionario",venderCoche)
  app.put("/concesionario/:id_cliente/:dinero",addMoney)
  app.put("/block/:id_concesionario/:bloqueado",blockventa)
  app.put("/move/:id_cliente1/:id_cliente2/:id_car",moveCar)
  /*
    2.- Create Car
    3.- Create cliente
    4.- Create concesionario
    5.- Send car->concesionario
    6.- Ver coches concesionario (recorrer concesionario)
    7.- Vender coche cliente
    8.-Ver coches cliente
    9.-Eliminar coche (cliente/concesionario)
    10.-Traspasar coche de un cliente a otro
    11.-Añadir dinero a cartera cliente
    12.- Bloquear venta a ciertos concesionarios.
  */


  app.listen(PORT, () => console.info(`Esucho desde el puerto ${PORT}`));

