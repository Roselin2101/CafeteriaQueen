import React from "react"
import Header from "./Header"
import firebase from "../firebase"

export const Cocinero = () => {

    const [pedidos, setPedidos]= React.useState([]);
    const [pedidosListos, setPedidosListos]= React.useState([]);

    React.useEffect(()=>{

        const obtenerDatos = async ()=>{
        try {
          const db = firebase.firestore()
          const data = await db.collection("productos").get()
          const arrayData = data.docs.map(doc =>({id: doc.id, ...doc.data()}))
          console.log(arrayData)
          setPedidos(arrayData)
          
        } catch (error) {
          console.log(error)
        }
        
        }
        obtenerDatos()
        }, [])
        
    return (
        <>
         <Header/>
         <div className="container mt-3  table-danger">
             <div className ="row">
            <div className= "col-md-6">
            Listas de Productos
            <ul className= "list-group">
                { pedidos.map(item =>(
                    <li className="list-group-item" key={item.id}>
                        {item.nombre}-{item.tipo}
                    </li>
                ))
                }
            </ul>
            </div>
             <div className= "col-md-6">
             Listas de Productos a servir
             </div>
             </div>
         </div>

        </>
    )
}