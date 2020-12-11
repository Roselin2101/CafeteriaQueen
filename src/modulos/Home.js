import React from "react";


export const Home = () => {

  return (
    <>
   <br></br>
   <br></br>
   <nav class="navbar navbar-light bg-light justify-content-md-center">
   <a href="/"><img
              src="assets/imagenes/logo.png"
              height= "90"
              alt="Maravillosas son tus Obras Dios"
              className="rounded mx-auto d-block img-responsive"
              style={{ margin: 10 }}
            /> </a>
            </nav>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
      <div className="col col-md-12">
        <div className="row">
          <div className="col col-md-6 text-center">
            <a href="/mesonero" className="btn btn-warning btn-md btn-block font-weight-bold">
              {" "}
              Mesonero 
            </a>
          </div>
          <div className="col col-md-6 text-center">
            <a href="/cocinero" className="btn btn-warning btn-md btn-block font-weight-bold">
              {" "}
              Cocinero
            </a>
          </div>
        </div>
      </div>
 
    </>
  );
};
