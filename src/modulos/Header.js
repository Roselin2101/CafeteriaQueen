import React from "react";

 const Header = () => {

  return (
    <>
      <div className="col col-md-12 text-center">
        <div className="row">
          <div className="col col-md-2"></div>
          <div className="col col-md-8">
            <img
              src="assets/imagenes/logo.png"
              alt="Maravillosas son tus Obras Dios"
              className="rounded mx-auto d-block  img-responsive"
              style={{ margin: 20 }}
            />
            <img
              src="assets/imagenes/titulo.png"
              alt="Maravillosas son tus Obras Dios"
              className="rounded mx-auto d-block  img-responsive"
              style={{ margin: 20 }}
            />
          </div>
          <div className="col col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default Header; 
