import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import AddPelicula from "./AddPelicula.tsx";
import { pelicula } from "../types.ts";

type Props = {
  pelicula: pelicula;
};

const Modal: FunctionComponent<Props> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [nameProyect, setNameProyect] = useState("");

  useEffect(() => {
    const span = document.querySelector(".close");
    const modal = document.querySelector(".modal");

    const openModal = () => {
      modal.style.display = "block";
    };

    const closeModal = () => {
      modal.style.display = "none";
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === modal) {
        closeModal();
      }
    };

    const handleBtnClick = () => {
      openModal();
    };

    span.addEventListener("click", closeModal);
    window.addEventListener("click", handleClickOutside);

    return () => {
      span.removeEventListener("click", closeModal);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleNameSubmit = (name: string) => {
    setNameProyect(name);
    setShowForm(false);
  };

  return (
    <div>
      <button type="button" onClick={() => setShowForm(true)}>
        Añadir a un proyecto
      </button>
      <div class="modal" style={{ display: showForm ? "block" : "none" }}>
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Seguro que quiere añadir esta película a su proyecto?</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={nameProyect}
              onChange={(e) => setNameProyect(e.currentTarget.value)}
              placeholder="Nombre del proyecto"
            />
          </form>
          <AddPelicula peliculas={props.pelicula} nameProyect={nameProyect} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
