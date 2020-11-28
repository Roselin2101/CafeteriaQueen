import React from "react";
import productosMenu from "./menu.json";
import MostrarProductos from "./MostrarProductos";
import MostrarItems from "./MostrarItems";
import Header from "./Header";

export const Mesonero = () => {
  const [tipoProductoId, setTipoProductoId] = React.useState();
  const [productos, setProductos] = React.useState([]);
  const [productoId, setProductoId] = React.useState();
  const [itemsOrden, setItemsOrden] = React.useState([]);
  const [totalPrecioPagar, setTotalPrecioPagar] = React.useState(0);

  React.useEffect(() => {
    setProductos(productosMenu.filter((item) => item.tipo === tipoProductoId));
  }, [tipoProductoId]);

  React.useEffect(() => {
    if (productoId) {
      const posicion = itemsOrden.map((item) => item.id).indexOf(productoId);
      if (posicion >= 0) {
        //producto encontrado
        itemsOrden[posicion].cantidad++; //--
        const suma = totalPrecioPagar + itemsOrden[posicion].precio;
        setTotalPrecioPagar(suma);
        setItemsOrden(itemsOrden);
      } else {
        const producto = productos.filter((item) => item.id === productoId)[0];
        const suma = totalPrecioPagar + producto.precio;
        setTotalPrecioPagar(suma);
        producto.cantidad = 1;
        setItemsOrden((oldArray) => [...oldArray, producto]); //nuevo array
        //producto no encontrado
      }
    }
  }, [productoId]);

  const eliminarItems = (productoId) => {
    const posicion = itemsOrden.map((item) => item.id).indexOf(productoId);
    if (itemsOrden[posicion].cantidad > 1) {
      //solo disminuimos
      itemsOrden[posicion].cantidad--; //esto disminuye la cantidad en 1
      const suma = totalPrecioPagar - itemsOrden[posicion].precio; //esto le resta el precio del producto a la suma
      setTotalPrecioPagar(suma); //actualizo el estado suma
      setItemsOrden(itemsOrden);
    } else {
      const items = itemsOrden.filter((item) => item.id !== productoId);
      setItemsOrden(items);
      const suma = totalPrecioPagar - itemsOrden[posicion].precio;
      setTotalPrecioPagar(suma);
      //eliminamos completo
    }
  };

  return (
    <>
      <Header />
      <div className="col col-md-12 table-danger">
        <div className="row">
          <div className="col col-md-6">
            <div className="card">
              <div className="card-header text-center">Productos</div>
              <div className="card-body">
                <div className="row">
                  <div className="col col-md-12 text-center">
                    Seleccione una opcion:
                  </div>
                </div>
                <div className="row">
                  <div className="col col-md-6 text-center">
                    <button
                      type="button"
                      className="btn btn-danger w-100"
                      onClick={() => setTipoProductoId(2)}
                    >
                      Tortas
                    </button>
                  </div>
                  <div className="col col-md-6 text-center">
                    <button
                      type="button"
                      className="btn btn-danger w-100"
                      onClick={() => setTipoProductoId(1)}
                    >
                      Bebidas
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-md-12">
                    <MostrarProductos
                      productos={productos}
                      setProductoId={setProductoId}
                      itemsOrden={itemsOrden}
                      totalPrecioPagar={totalPrecioPagar}
                      setItemsOrden={setItemsOrden}
                      setTotalPrecioPagar={setTotalPrecioPagar}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-6">
            <div className="card">
              <div className="card-header text-center">Pedidos</div>
              <ul className="list-group list-group-flush">
                {" "}
                <MostrarItems
                  items={itemsOrden}
                  eliminarItems={eliminarItems}
                />
                <li className="list-group-item">
                  <div className="row">
                    <div className="col col-md-1 text-center"></div>
                    <div className="col col-md-5 text-center"></div>
                    <div className="col col-md-5 text-right">
                      Total: ${totalPrecioPagar}{" "}
                      <button
                        className="btn btn-danger btn-block "
                        onClick={() => alert("Hola me diste un click")}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
