import { FunctionComponent } from "preact";
import { peliculasProyects } from "../types.ts";
import AddPelicula from "../islands/AddPelicula.tsx";
import EliminarPelicula from "../islands/EliminarPelicula.tsx";
import EliminarProyecto from "../islands/EliminarProyecto.tsx";


type Props = {
  infopeli: peliculasProyects[];
};

const InfoProyectos: FunctionComponent<Props> = ({ infopeli }) => {

  return (
    <div className="filtrado-container">
      {infopeli.map((proyecto) => (
        <div key={proyecto.nombreProyecto}>
          <h2>{proyecto.nombreProyecto}</h2>
          <div>
            <EliminarProyecto nameProyect={proyecto.nombreProyecto}/>
            </div>
          {proyecto.peliculas.map((pelicula) => (
            <div className="pelicula-item" key={pelicula._id}>
              <div className="pelicula-details">
                <div>
                  <strong>{pelicula.name}</strong>
                </div>
                <div>{pelicula.brand}</div>
                <div>
                  <AddPelicula peliculas={pelicula} nameProyect={proyecto.nombreProyecto} />
                </div>
                <div className="pelicula-color">
                  Cantidad: {pelicula.quantity}
                </div>
                <div>
                  <EliminarPelicula peliculas={pelicula} nameProyect={proyecto.nombreProyecto}/>
                  </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InfoProyectos;

