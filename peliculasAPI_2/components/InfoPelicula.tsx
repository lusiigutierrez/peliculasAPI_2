import { FunctionComponent } from "preact";
import { pelicula } from "../types.ts";

const InfoPelicula: FunctionComponent<{ pelicula: pelicula }> = (
  { pelicula },
) => {
  return (
    <div className="info-pelicula-container">
      <div className="info">
        <div className="info-item">
          <strong>ID:</strong> {pelicula._id}
        </div>
        <div className="info-item">
          <strong>Marca:</strong> {pelicula.brand}
        </div>
        <div className="info-item">
          <strong>Nombre:</strong> {pelicula.name}
        </div>
        <div className="info-item">
          <strong>ISO:</strong> {pelicula.iso}
        </div>
        <div className="info-item">
          <strong>Formato 35mm:</strong>{" "}
          {pelicula.formatThirtyFive ? "Sí" : "No"}
        </div>
        <div className="info-item">
          <strong>Formato 120:</strong> {pelicula.formatOneTwenty ? "Sí" : "No"}
        </div>
        <div className="info-item">
          <strong>Color:</strong> {pelicula.color ? "Sí" : "No"}
        </div>
        <div className="info-item">
          <strong>Proceso:</strong> {pelicula.process}
        </div>
        <div className="info-item">
          <strong>Descripción:</strong> {pelicula.description}
        </div>
        <div className="info-item">
          <strong>Características clave:</strong>
          <ul>
            {pelicula.keyFeatures.map((feature) => (
              <li key={feature._id}>{feature.feature}</li>
            ))}
          </ul>
        </div>
        <div className="info-item">
          <strong>Fecha de añadido:</strong> {pelicula.dateAdded}
        </div>
      </div>
      <div className="imagen">
        <img src={pelicula.staticImageUrl} alt={pelicula.name} />
      </div>
      <div>
        <a href={`/`}>
          <button>Volver al inicio</button>
        </a>
      </div>
    </div>
  );
};

export default InfoPelicula;
