import React from "react";

const MostrarProductos = (props) => {
  const agregarProducto = (productoId) => {
    if (productoId) {
      const posicion = props.itemsOrden
        .map((item) => item.id)
        .indexOf(productoId);
      if (posicion >= 0) {
        //producto encontrado
        props.itemsOrden[posicion].cantidad++; //--
        const suma = props.totalPrecioPagar + props.itemsOrden[posicion].precio;
        props.setTotalPrecioPagar(suma);
        props.setItemsOrden(props.itemsOrden);
      } else {
        const producto = props.productos.filter(
          (item) => item.id === productoId
        )[0];
        const suma = props.totalPrecioPagar + producto.precio;
        props.setTotalPrecioPagar(suma);
        producto.cantidad = 1;
        props.setItemsOrden((oldArray) => [...oldArray, producto]); //nuevo array
        //producto no encontrado
      }
    }
  };
  
  const mostrar = (items) => {
    return items.map((item) => {
      return (
        <div key={item.id} className="row">
          <div className="col col-md-12  text-center" style={{ margin: 10 }}>
            <button
              type="button"
              className="btn btn-warning  w-70 btn-block "
              onClick={() => agregarProducto(item.id)}
            >
              {item.nombre}-{item.precio}
            </button>
          </div>
        </div>
      );
    });
  };

  return <>{mostrar(props.productos)}</>;
};

export default MostrarProductos;
