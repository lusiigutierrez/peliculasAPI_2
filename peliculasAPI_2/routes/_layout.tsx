import { FreshContext } from "$fresh/server.ts";

const Layout = async (req: Request, ctx: FreshContext) => {
  const Component = ctx.Component;
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Películas Fotográficas</h1>
        <a href={"/"}>
          <button>Inicio</button>
        </a>
        <a href={"/proyectos"} >
          <button>Proyectos</button>
        </a>
      </div>
      <div className="content">
        <Component />
      </div>
    </div>
  );
};

export default Layout;
