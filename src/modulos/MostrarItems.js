import React from "react";

const MostrarItems = (props) => {
  const mostrar = (items) => {
    return items.map((item) => {
      return (
        <>
          <li className="list-group-item">
            <div className="row">
              <div className="col col-md-1 text-center">
                <button className="btn btn-danger mg-2"onClick={()=> props.eliminarItems(item.id)}>X</button>
              </div>
              <div className="col col-md-11 text-right btn btn-danger m-4 text-center"> ({item.cantidad}) {item.nombre} ${item.precio} </div>
              {/* <div className="col col-md-5 text-right"> ${item.precio} </div> */}
            </div>
          </li>
        </>
      );
    });
  };

  return <>{mostrar(props.items)}</>;
};

export default MostrarItems;
