import React from "react";
import Header from "./Header";

export const Home = () => {

  return (
    <>
   <Header/>
      <div className="col col-md-12">
        <div className="row">
          <div className="col col-md-6 text-center">
          <img width="304"
              height="236"
              src="assets/imagenes/mesonero.jpg"
              alt="Maravillosas son tus Obras Dios"
              className="rounded mx-auto d-block img-responsive"
              style={{ margin: 15 }}
            />
            <a href="/mesonero" className="btn btn-danger btn-md btn-block">
              {" "}
              Mesonero 
            </a>
          </div>
          <div className="col col-md-6 text-center">
          <img width="304"
              height="236"
              src="assets/imagenes/cocinero.jpg"
              alt="Maravillosas son tus Obras Dios"
              className="rounded mx-auto d-block img-responsive"
              style={{ margin: 15 }}
            />
            <a href="/cocinero" className="btn btn-danger btn-md btn-block">
              {" "}
              Cocinero
            </a>
          </div>
        </div>
      </div>
      {/* <img    width="304"
              height="236"
              src="assets/imagenes/Imagen1.png"
              alt="Maravillosas son tus Obras Dios"
              className="rounded mx-auto d-block img-responsive"
              style={{ margin: 15 }}
            /> */}
    </>
  );
};
