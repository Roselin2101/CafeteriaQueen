import React from "react";
import Header from "./Header";
import firebase from "../firebase";
import mesonero from "./Mesonero";

export const Cocinero = () => {
  const [pedidos, setPedidos] = React.useState([]);

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firebase.firestore();
        const data = await db.collection("pedidos").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayData);
        setPedidos(arrayData);
      } catch (error) {}
    };
    obtenerDatos();
  }, []);
// funcion que elimina pedido, cada vez que esta listo 
const eliminar = async(id)=>{
    try {
        const db = firebase.firebase.firestore()
        await db.collection("pedidos").doc(id).delete()
        
        const arrayFiltrado= pedidos.filter(item => item.id !== id)
        setPedidos(arrayFiltrado)
    
    } catch (error) {
        console.log(error)
    }
}


  return (
    <>
      <Header />
      <div className="container mt-3  table-danger">
        <div className="row">
          <div className="col-md-12">
            Listado Clientes - Mesas
            <ul className="list-group">
              {pedidos.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <div className="row">
                    <div class="col col-md-4">
                      <div className="row">
                        <div className="col col-md-4">Mesa:</div>
                        <div className="col col-md-8">{item.mesa}</div>
                      </div>
                      <div className="row">
                        <div className="col col-md-4">Cliente:</div>
                        <div className="col col-md-8">{item.cliente}</div>
                      </div>
                    </div>
                    <div className="col col-md-7">
                      {item.productos.map((producto) => (
                        <div className="row">
                          <div className="col col-md-1">
                            {producto.cantidad}
                          </div>
                          <div className="col col-md-6">{producto.nombre}</div>
                        </div>
                      ))}
                    </div>
                    <div className="col col-md-5">
                      <button
                        type="button"
                        className="btn btn-success btn-sm float-light  mr-2"
                        onClick={() => alert("El pedido se encuentra listo")}
                      >
                        {" "}
                        Listo
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm float-right"
                        onClick={() => eliminar(item.id)}
                      >
                        {" "}
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
