import { FunctionComponent } from "preact";
import { pelicula, peliculasProyects } from "../types.ts";

type Props = {
  peliculas: pelicula;
  nameProyect: string;
};

const AddPelicula: FunctionComponent<Props> = (props) => {
  const onAddPelicula = (peliculas: pelicula, nameProyect: string) => {

    const cookies = document.cookie ? document.cookie.split("; ") : [];
    let proyectoCookies: string | undefined;

    // Encuentra la cookie que comienza con "ProyectosDePeliculas="
    for (const cookie of cookies) {
      if (cookie.startsWith("ProyectosDePeliculas=")) {
        proyectoCookies = cookie.split("=")[1];
        break;
      }
    }

    let proyecto: Record<string, any>[] = [];

    // Si se encontró la cookie, analiza su valor en un array
    if (proyectoCookies) {
      proyecto = JSON.parse(proyectoCookies);
    }

    // Encuentra el proyecto existente o crea uno nuevo si no existe
    let existingProject = proyecto.find((p) =>
      p.nombreProyecto === nameProyect
    );
    if (!existingProject) {
      existingProject = {
        nombreProyecto: nameProyect,
        peliculas: [],
      };
      proyecto.push(existingProject);
    }

    // Verifica si la película ya existe en el proyecto
    const foundIndex = existingProject.peliculas.findIndex((p) =>
      p._id === peliculas._id
    );
    if (foundIndex !== -1) {
      existingProject.peliculas[foundIndex].quantity++;
    } else {
      existingProject.peliculas.push({
        _id: peliculas._id,
        name: peliculas.name,
        brand: peliculas.brand,
        quantity: 1,
      });
    }

    // Guarda el array de proyectos actualizado en la cookie
    document.cookie = `ProyectosDePeliculas=${
      JSON.stringify(proyecto)
    }; path=/`;
  };

  return (
    <button
      class="add"
      onClick={(e) => onAddPelicula(props.peliculas, props.nameProyect)}
    >
      Añadir película
    </button>
  );
};

export default AddPelicula;
