import Axios from "npm:axios";
import { pelicula } from "../types.ts";
import Filtrado from "../islands/filtrado.tsx";


export default async function ruta() {
  try {
    const API_URL =("https://filmapi.vercel.app/api/films");

    const response = await Axios.get(`${API_URL}`);
    const peliculaAPI: pelicula[] = response.data;

    return (
      <div >

        <Filtrado peliculas={peliculaAPI} />
    
      </div>
    );
  } catch (e) {
    return <div>Ha habido un error</div>;
  }
}
