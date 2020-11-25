import React from "react";
import Header from "./Header";

export const Home = () => {

  return (
    <>
   <Header/>
      <div className="col col-md-12">
        <div className="row">
          <div className="col col-md-6 text-center">
            <a href="/mesonero" className="btn btn-danger btn-lg btn-block">
              {" "}
              Mesonero
            </a>
          </div>
          <div className="col col-md-6 text-center">
            <a href="/cocinero" className="btn btn-danger btn-lg btn-block">
              {" "}
              Cocinero
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
