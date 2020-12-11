import React from "react";


 const Header = () => {

  return (
    <>

<nav class="navbar navbar-light bg-light  ">
  <form class="form-inline">
  <a href="/"> <button class="btn btn-warning  mr-2" type="button">Inicio</button></a>
  </form>
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
   
    </>
  );
};

export default Header; 
