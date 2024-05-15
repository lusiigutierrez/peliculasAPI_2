import { FunctionComponent } from "preact";
import { pelicula, peliculasProyects } from "../types.ts";

type Props = {
  nameProyect: string;
};

const EliminarProyecto: FunctionComponent<Props> = (props) => {
  const onEliminarProyecto = (nameProyect: string) => {
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

    let proyectos: { nombreProyecto: string; peliculas: any[] }[] = [];

    // Si se encontró la cookie, analizar su valor en un array
    if (proyectoCookies) {
      proyectos = JSON.parse(proyectoCookies);
    }

    // Encontrar y eliminar el proyecto correspondiente
    proyectos = proyectos.filter((proyecto) =>
      proyecto.nombreProyecto !== nameProyect
    );

    // Actualizar la cookie sin el proyecto eliminado
    document.cookie = `ProyectosDePeliculas=${
      JSON.stringify(proyectos)
    }; path=/`;
  };

  return (
    <button
      className="remove"
      onClick={() => onEliminarProyecto(props.nameProyect)}
    >
      Eliminar proyecto
    </button>
  );
};

export default EliminarProyecto;
