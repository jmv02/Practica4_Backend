export type Car = {
    id_coche:number; 
    modelo:string; 
    matricula:string;
    price:number; 
}

export type Cliente = {
    id_cliente:number;
    name_cliente:string; 
    cartera:number; 
    coches:Car[]; 

}



export type Concesionario = {
    id_concesionario:number;
    name_concesionario:string;
    bloqueado:boolean; 
    concesionario:Car[];   //Tiene que ser 10 coches maximo concesionario.size <= 10; 


}   

