import React from "react";


 const Header = () => {

  return (
    <>

<nav class="navbar navbar-light bg-light ">
  <form class="form-inline">
  <a href="/"> <button class="btn btn-outline-danger mr-2" type="button">Inicio</button></a>
  </form>
</nav>
<br></br>
<br></br>
      <div className="col col-md-12 text-center">
        <div className="row">
          <div className="col col-md-2"></div>
          <div className="col col-md-8">
          <a href="/"><img
              src="assets/imagenes/logo.png"
              height= "100"
              alt="Maravillosas son tus Obras Dios"
              className="rounded mx-auto d-block img-responsive"
              style={{ margin: 10 }}
            /> </a>
            <img
              src="assets/imagenes/titulo.png"
              height= "50"
              alt="Maravillosas son tus Obras Dios"
              className="rounded mx-auto d-block img-responsive"
              style={{ margin: 10 }}
            />
          </div>
          <div className="col col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default Header; 
