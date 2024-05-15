import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import InfoProyectos from "../components/InfoProyectos.tsx";
import InfoP from "../islands/galletas.tsx";
import { peliculasProyects } from "../types.ts";

type Data = {
  proyectos: peliculasProyects[];
};

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext<unknown, Data>) => {
    const cookies = getCookies(req.headers);
    let proyectos: peliculasProyects[] = [];

    if (cookies.ProyectosDePeliculas) {
      try {
        proyectos = JSON.parse(cookies.ProyectosDePeliculas);
      } catch (e) {
        console.error("Error parsing JSON: ", e);
      }
    }

    return ctx.render({ proyectos });
  },
};

const Page = (props: PageProps<Data>) => {
  const infopeli = props.data.proyectos;

  return (
    <div>
      <h1>Aqui se encuentra su proyecto</h1>
      {infopeli.length === 0
        ? <p>No ha añadido ninguna película fotográfica</p>
        : <InfoProyectos infopeli={infopeli} />}
    </div>
  );
};

export default Page;

/*
type Data = {
  allCookies: any;
  proyecto1: peliculasProyects[];
  proyecto2: peliculasProyects[];
};

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext<unknown, Data>) => {
    const cookies = getCookies(req.headers);
    const allCookies = Object.keys(cookies).map(key => ({ name: key, value: cookies[key] }));
    return ctx.render({ allCookies });
  },
};

const Page = (props: PageProps<Data>) => {
  const allCookies = props.data.allCookies;
  return (
    <div>
      {allCookies.map(cookie => (
        <div key={cookie.name}>
          <p>{cookie.name}: {cookie.value}</p>

        </div>
      ))}
    </div>
  );
};

export default Page;

*/

/*

Cliente

const Page = () => <InfoP />;

export default Page;

*/
