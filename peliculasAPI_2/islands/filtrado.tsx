import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import Modal from "./Modal.tsx";

const Filtrado: FunctionComponent<{ peliculas: any[] }> = ({ peliculas }) => {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [isoSeleccionado, setIsoSeleccionado] = useState("");
  const [formatoSeleccionado, setFormatoSeleccionado] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [nombreFiltro, setNombreFiltro] = useState("");

  const marcasUnicas = [...new Set(peliculas.map((p) => p.brand))];
  const isosUnicos = [...new Set(peliculas.map((p) => p.iso))];
  const formatosUnicos = [
    ...new Set([
      ...peliculas.map((p) => p.formatThirtyFive && "35mm"),
      ...peliculas.map((p) => p.formatOneTwenty && "120"),
    ]),
  ];
  const coloresUnicos = [
    ...new Set(peliculas.map((p) => p.color ? "Color" : "Blanco y Negro")),
  ];

  const filtrarPeliculas = (p: any) => {
    return (!marcaSeleccionada || p.brand === marcaSeleccionada) &&
      (!isoSeleccionado || p.iso.toString() === isoSeleccionado) &&
      (!formatoSeleccionado ||
        (p.formatThirtyFive && formatoSeleccionado === "35mm") ||
        (p.formatOneTwenty && formatoSeleccionado === "120")) &&
      (!colorSeleccionado || (p.color && colorSeleccionado === "Color") ||
        (!p.color && colorSeleccionado === "Blanco y Negro")) &&
      (!nombreFiltro ||
        p.name.toLowerCase().includes(nombreFiltro.toLowerCase()));
  };

  const peliculasFiltradas = peliculas.filter(filtrarPeliculas);

  return (
    <div>
      <form className="filtrado-container">
        <div>
          <select
            id="marca"
            value={marcaSeleccionada}
            onChange={(e) => setMarcaSeleccionada(e.currentTarget.value)}
          >
            <option value="">Marca</option>
            {marcasUnicas.map((marca) => (
              <option value={marca} key={marca}>{marca}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            id="iso"
            value={isoSeleccionado}
            onChange={(e) => setIsoSeleccionado(e.currentTarget.value)}
          >
            <option value="">ISO</option>
            {isosUnicos.map((iso) => (
              <option value={iso} key={iso}>{iso}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            id="formato"
            value={formatoSeleccionado}
            onChange={(e) => setFormatoSeleccionado(e.currentTarget.value)}
          >
            <option value="">Formato</option>
            {formatosUnicos.map((formato) => (
              <option value={formato} key={formato}>{formato}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            id="color"
            value={colorSeleccionado}
            onChange={(e) => setColorSeleccionado(e.currentTarget.value)}
          >
            <option value="">Color o Blanco y Negro</option>
            {coloresUnicos.map((color) => (
              <option value={color} key={color}>{color}</option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre "
            value={nombreFiltro}
            onChange={(e) => setNombreFiltro(e.currentTarget.value)}
          />
        </div>

        {peliculasFiltradas.map((p) => (
          <div className="pelicula-item" key={p._id}>
            <a href={`/infoPelicula/${p.name}`}>
              <img
                className="pelicula-image"
                src={p.staticImageUrl}
                alt={p.name}
              />
            </a>
            <div className="pelicula-details">
              <div className="pelicula-brand">{p.brand}</div>
              <div className="pelicula-name">{p.name}</div>
              <div className="pelicula-iso">ISO: {p.iso}</div>
              <div className="pelicula-formato">
                Formato: {p.formatThirtyFive ? "35mm" : ""}{" "}
                {p.formatOneTwenty ? "120" : ""}
              </div>
              <div className="pelicula-color">
                Color: {p.color ? "Color" : "Blanco y Negro"}
              </div>
              <div>
                <Modal pelicula={p} />
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Filtrado;
