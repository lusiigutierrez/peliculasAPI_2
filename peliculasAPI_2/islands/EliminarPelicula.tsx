import { FunctionComponent } from "preact";
import { pelicula, peliculasProyects } from "../types.ts";

type Props = {
  peliculas: pelicula;
  nameProyect: string;
};

const EliminarPelicula: FunctionComponent<Props> = (props) => {
  const onEliminarPelicula = (peliculas: pelicula, nameProyect: string) => {
    // Leer la cookie del proyecto
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    let proyectoCookies: string | undefined;

    // Encontrar la cookie que comienza con "ProyectosDePeliculas="
    for (const cookie of cookies) {
      if (cookie.startsWith("ProyectosDePeliculas=")) {
        proyectoCookies = cookie.split("=")[1];
        break;
      }
    }

    let proyecto: Record<string, any>[] = [];

    // Si se encontró la cookie, analizar su valor en un array
    if (proyectoCookies) {
      proyecto = JSON.parse(proyectoCookies);
    }

    // Encontrar el proyecto correspondiente
    const proyectoActual = proyecto.find((p) =>
      p.nombreProyecto === nameProyect
    );
    if (!proyectoActual) {
      return;
    }

    // Encontrar la película correspondiente en el proyecto y disminuir su cantidad
    const peliculaActual = proyectoActual.peliculas.find((p) =>
      p._id === peliculas._id
    );
    if (peliculaActual) {
      peliculaActual.quantity--;
      // Si la cantidad llega a cero, eliminar la película del proyecto
      if (peliculaActual.quantity === 0) {
        proyectoActual.peliculas = proyectoActual.peliculas.filter((p) =>
          p._id !== peliculas._id
        );
      }

      // Actualizar la cookie con el proyecto modificado
      document.cookie = `ProyectosDePeliculas=${
        JSON.stringify(proyecto)
      }; path=/`;
    }
  };

  return (
    <button
      className="remove"
      onClick={() => onEliminarPelicula(props.peliculas, props.nameProyect)}
    >
      Eliminar película
    </button>
  );
};

export default EliminarPelicula;
