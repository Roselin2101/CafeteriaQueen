import React from "react";
import productosMenu from "./menu.json";
import MostrarProductos from "./MostrarProductos";
import MostrarItems from "./MostrarItems";
import Header from "./Header";
import firebase from "../firebase";

export const Mesonero = () => {
  const [tipoProductoId, setTipoProductoId] = React.useState();
  const [productos, setProductos] = React.useState([]);
  const [productoId, setProductoId] = React.useState();
  const [itemsOrden, setItemsOrden] = React.useState([]);
  const [nombreCliente, setNombreCliente] = React.useState();
  const [numeroMesa, setNumeroMesa] = React.useState();
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
  // funcion para agregar pedido a firebase
  const enviarPedidos = () => {
    console.log("aqui enviare los pedidos a firebase");
    let pedido = {
      mesa: numeroMesa,
      cliente: nombreCliente,
      fecha: new Date(),
      atendido: 0,
      productos: itemsOrden.map((item) => {
        return { nombre: item.nombre, cantidad: item.cantidad };
      }),
    };
    firebase.firebase
      .firestore()
      .collection("pedidos")
      .doc(nombreCliente + "-" + numeroMesa)
      .set(pedido);
    setNombreCliente("");
    setNumeroMesa("");
    setProductoId("");
    setItemsOrden([]);
    setTotalPrecioPagar("");
  };

  // funcion para nombre cliente
  const cambioNombreCliente = (e) => {
    setNombreCliente(e.target.value);
  };

  //funcion numero de mesa
  const cambioNumeroMesa = (e) => {
    setNumeroMesa(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="col col-md-12 table-danger">
        <div className="row">
          <div className="col col-md-6">
            <div className="card">
              <div className="card-header text-center bg-light font-weight-bold ">
                Productos
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col col-md-12 text-center bg-light font-weight-bold">
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
              <div className="card-header text-center bg-light font-weight-bold">
                Pedidos
              </div>
              <ul className="list-group list-group-flush">
                {" "}
                <li className="list-group-item  bg-light font-weight-bold">
                  <div className="row">

                    <div className="col col-md-4 ">Cantidad</div>
                    <div className="col col-md-4">Producto</div>
                    <div className="col col-md-4">Precio</div>
                  </div>
                </li>
                <MostrarItems
                  items={itemsOrden}
                  eliminarItems={eliminarItems}
                />
<li className="list-group-item  bg-light font-weight-bold">
                  <div className="row">
                    <div className="col col-md-4 text-center">
                      {" "}
                      Nombre Cliente:{" "}
                    </div>
                    <div className="col col-md-8 text-center">
                      <input
                        value={nombreCliente}
                        onChange={cambioNombreCliente}
                        description="Nombre"
                        placeholder="Ingresa Nombre"
                        type="text"
                      />
                    </div>
                  </div>
                </li>
                <li className="list-group-item   bg-light font-weight-bold">
                  <div className="row">
                    <div className="col col-md-4 text-center">
                      {" "}
                      Numero Mesa:
                    </div>
                    <div className="col col-md-8 text-center">
                      <input
                        value={numeroMesa}
                        onChange={cambioNumeroMesa}
                        description="Numero"
                        placeholder="Numero Mesa"
                        type="numero"
                      />
                    </div>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className="row">
                    <div className="col col-md-1 text-center"></div>
                    <div className="col col-md-6 text-center">
                      <button
                        className="btn btn-danger btn-block "
                        onClick={() => enviarPedidos()}
                      >
                        Enviar{" "}
                      </button>
                    </div>
                    <div className="col col-md-2 text-right bg-light font-weight-bold">
                      Total:
                    </div>
                    <div className="col col-md-3 text-center">
                      ${totalPrecioPagar}{" "}
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
