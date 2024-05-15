import { FreshContext } from "$fresh/server.ts";
import Axios from "npm:axios";
import InfoPelicula from "../../components/InfoPelicula.tsx";

export default async function ruta(_: unknown, ctx: FreshContext) {
  try {
    const { name } = ctx.params;

    // Convertir el nombre de la película proporcionado en la URL a un formato compatible con los nombres de las películas en la base de datos
    const formattedName = name.replace(/%20/g, " "); // Reemplazar %20 con espacios en blanco

    const API_URL = `https://filmapi.vercel.app/api/films`;

    // Realizar una solicitud para obtener todas las películas
    const response = await Axios.get(`${API_URL}`);
    const peliculas: pelicula[] = response.data;

    // Encontrar la película con el nombre proporcionado
    const pelicula = peliculas.find(pelicula => pelicula.name.toLowerCase() === formattedName.toLowerCase());

    if (!pelicula) {
      // Si no se encuentra la película, mostrar un mensaje de error
      return <div>No te inventes películas fotográficas!!</div>;
    }

    return <InfoPelicula pelicula={pelicula} />;
  } catch (e) {
    // Manejar errores
    return <div>Ha habido un error</div>;
  }
}
