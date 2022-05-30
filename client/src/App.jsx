import { useState, useEffect } from 'react'
import Axios from 'axios'
import './assets/style.css'
import Cookies from 'universal-cookie'

// Components

import Balance from './components/balanceActual.jsx'
import Nav from './components/nav.jsx'

function App() {
  const [count, setCount] = useState(0)
  const cookies = new Cookies();

  let deteleItem = function(id) {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      // Lo que quiero que pase despues de que se elimine
      console.log("se elimino correctamente el elemento con id " + id)
    });
  };

  let pruebaAdd = function(){
     Axios.post("http://localhost:3001/api/create", {
      consept: "prueba",
      type: "asdsad",
      amount: 1234,
      date: "15/12/2000",
    }).then(()=>{
      console.log("lo que quiero que pase cuando termina de cargar")
    })
  }

  let pruebaChange = function(){
     Axios.put("http://localhost:3001/update", {
      id: 3,
      consept: "kkp2pis",
    }).then(()=>{
      console.log("se cargo el cambio")
    }).catch((error)=>{
      console.log(error)
    })
  }

  let pruebaRegister = function(){
    Axios.post("http://localhost:3001/api/register", {
      mail: "nachoalmada@gmail.com",
      username: "nachoalmada",
      password: "prueba123"
    } ).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }


  return (
    <div>
      <Nav/>
      <Balance/>
    </div>
  )
}

export default App
