import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { peliculasProyects } from "../types.ts";
import EliminarPelicula from "./EliminarPelicula.tsx";
import AddPelicula from "./AddPelicula.tsx";


const InfoP: FunctionComponent = () => {
  const [pelicula, setPelicula] = useState<peliculasProyects[]>([]);

  useEffect(() => {

    const cookies = document.cookie.split("; ");
    console.log(cookies);
    const peliculasCookie = cookies.find((cookie) => cookie.startsWith("ProyectosDePeliculas="));

    if (peliculasCookie) {
      setPelicula(JSON.parse(peliculasCookie.split("=")[1]));
    }
  }, );

  return (
    <div>
    <h1>Bienvenido a sus proyectos</h1>
      <div className="filtrado-container">
        
        {pelicula.map((item) => (
          <div class="item" key={item.peliculas._id}>
            <span class="name">{item.peliculas.name}</span>
            <span class="price">{item.peliculas.brand}</span>
            <EliminarPelicula peliculas={item.peliculas} />
            <span class="quantity">{item.quantity}</span>
            <AddPelicula peliculas={item.peliculas} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoP;