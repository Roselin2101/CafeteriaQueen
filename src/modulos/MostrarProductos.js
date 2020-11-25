import React from "react";

const MostrarProductos = (props) => {
  const mostrar = (items) => {
    return items.map((item) => {
      return (
        <div key={item.id} className="row">
          <div className="col col-md-12  text-center" style={{ margin: 10 }}>
            <button
              type="button"
              className="btn btn-success  w-50"
              onClick={() => props.setProductoId(item.id)}>
              {item.nombre}
            </button>
          </div>
        </div>
      );
    });
  };

  return <>{mostrar(props.productos)}</>;
};
export default MostrarProductos;
