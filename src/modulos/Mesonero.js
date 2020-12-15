import React from "react";
import productosMenu from "./menu.json";
import MostrarProductos from "../componentes/MostrarProductos";
import MostrarItems from "../componentes/MostrarItems";
import Header from "../componentes/Header";
import firebase from "../firebase";


export const Mesonero = () => {
  const [tipoProductoId, setTipoProductoId] = React.useState();
  const [productos, setProductos] = React.useState([]);
  const [productoId, setProductoId] = React.useState();
  const [itemsOrden, setItemsOrden] = React.useState([]);
  const [nombreCliente, setNombreCliente] = React.useState();
  const [numeroMesa, setNumeroMesa] = React.useState();
  const [totalPrecioPagar, setTotalPrecioPagar] = React.useState(0);
  const [pedidosListoServir, setPedidosListoServir] = React.useState([]);


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
 
  React.useEffect(() => {
    const obtenerDatosPedidosListos = async () => {
      try {
        const db = firebase.firebase.firestore();
        const dataPedidosListos = await db.collection("pedidosListos").get();
        const arrayDataPedidos = dataPedidosListos.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayDataPedidos);
        setPedidosListoServir(arrayDataPedidos);
      } catch (error) {
        console.log(error)
      }
    };
    obtenerDatosPedidosListos();
  }, []);


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
    firebase.firebase.firestore().collection("pedidos").doc().set(pedido);
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
// funcion que elimina pedido, cada vez que se le entregue al cliente

const eliminarPedidosListos = async(id)=>{
  try {
      const db = firebase.firebase.firestore()
      await db.collection("pedidosListos").doc(id).delete()
      
      const arrayFiltrado= pedidosListoServir.filter(item => item.id !== id)
      setPedidosListoServir(arrayFiltrado)
  
  } catch (error) {
      console.log(error)
  }
}
  return (
    <>
      <Header />
      <br></br>
      <br></br>
      <div className="col col-md-12 table-outline-warning">
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
                      className="btn btn-warning  w-100"
                      onClick={() => setTipoProductoId(2)}
                    >
                      Tortas
                    </button>
                  </div>
                  <div className="col col-md-6 text-center">
                    <button
                      type="button"
                      className="btn btn-warning  w-100"
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
                <li className="list-group-item  bg-light font-weight-bold table-responsive">
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

                <li className="list-group-item table-responsive">
                  <div className="row">
                    <div className="col col-md-1 text-center"></div>
                    <div className="col col-md-5 text-center">
                      <button
                        className="btn btn-warning  btn-block "
                        onClick={() => enviarPedidos()}
                      >
                        Enviar{" "}
                      </button>
                    </div>
                    <div className="col col-md-3 text-right bg-light font-weight-bold">
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
      <div className="col col-md-12 table-outline-warning">
        <div className="row">
          <div className="col col-md-6">
            <div className="card">
              <div className="card-header text-center bg-light font-weight-bold md">
                Pedidos Listos Para Entregar a Clientes
                <ul className="list-group">
              {pedidosListoServir.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <div className="row">
                    <div class="col col-md-">
                      <div className="row">
                        <div className="col col-md-7">NroMesa:</div>
                        <div className="col col-md-5">{item.mesa}</div>
                      </div>
                      <div className="row">
                        <div className="col col-md-7">Cliente:</div>
                        <div className="col col-md-5">{item.cliente}</div>
                      </div>
                    </div>
                    <div className="col col-md- table-responsive-md">
                      {item.productos.map((producto) => (
                        <div className="row">
                          <div className="col col-md-3 table-responsive-md">
                            {producto.cantidad}
                          </div>
                          <div className="col col-md-9 table-responsive-md">{producto.nombre}</div>
                        </div>
                      ))}
                      <div className="row">
                    <div className="col col-md ">
                       <button
                      type="button"
                      className="btn btn-warning  w-80 "
                      onClick={() => eliminarPedidosListos(item.id)}
                    >
                      Entregado
                    </button>
                    </div>
                    </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
              </div>
                    </div>
                    </div>
                    </div>
                    </div>
    </>
  );
};
