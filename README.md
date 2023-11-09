# Practica4_Backend

*/ENDPOINTS*/

  app.post("/concesionario/cochenuevo",addCar); Añade un coche nuevo
  app.post("/concesionario/clientenuevo",addCliente); Añade un cliente nuevo
  app.post("/concesionario/concesionarionuevo",addConcesionario); Añade un concesionario nuevo
  app.put("/send/:id_coche/:id_concesionario",sendCar); A través del id del coche y del concesionario manda dicho coche al concesionario
  app.get("/viewConcesionario/:id_concesionario/coches",viewCars); Muestra los coches del concesionario
  app.get("cliente/coches",viewClientCars); Muestra los coches del cliente
  app.delete("/concesionario/:id_concesionario/:id_coche",deleteCarConcesionario) Borra coches del concesionario
  app.delete("/cliente/:id_cliente/:id_coche",deleteCarClient); Borra coces del cliente
  app.put("/venderCoche/:id_cliente/:id_coche/:id_concesionario",venderCoche) Vende un coche a un cliente
  app.put("/concesionario/:id_cliente/:dinero",addMoney) Añade dinero a un cliente
  app.put("/block/:id_concesionario/:bloqueado",blockventa) Bloquea la venta a un concesionario
  app.put("/move/:id_cliente1/:id_cliente2/:id_car,moveCar") Un cliente le traspasa su coche a otra cliente

  .env sample 
  PORT = puerto desde el que lanzo la aplicacion
  MONGO_URL= url mongo 

