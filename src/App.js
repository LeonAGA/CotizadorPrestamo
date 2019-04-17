import React, { Component, Fragment} from 'react';
import './normalize.css';
import './skeleton.css';
import  {calcularTotal} from './helpers';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Mensaje from'./components/Mensaje';
import Spinner from './components/Spinner';

class App extends Component {

  state = {
    total: '',
    cantidad: '',
    plazo: '',
    cargando : false
  }

  datosPrestamo = (cantidad, plazo) => {
   const total = calcularTotal(cantidad,plazo);

   //Colocar el resultado en el state de App.js junto a la cantidad y al plazo
   this.setState({
      cargando: true
   }, () =>{    //con coma dentro del state pudes llamar un callback para que se ejecute despues del state.
     setTimeout(()=>{
      this.setState({
        total : total,
        cantidad : cantidad,
        plazo : plazo,
        cargando: false
      })
     },3000);
   })
  }

  render() {
    const {total,plazo,cantidad,cargando} = this.state;
    //Cargar un componente condicionalmente
    let componente;
    if(total === '' && !cargando){
     componente = <Mensaje/>
    }else if(cargando){
     componente = <Spinner/>
    }else{
      componente =  <Resultado
      total = {total}
      plazo = {plazo}
      cantidad = {cantidad}
    />
    }
    return (
      <Fragment>
        <h1>Cotizador de Prestamos</h1>
        <div className="container">
        <Formulario
        datosPrestamo = {this.datosPrestamo}
        />
        <div className="mensajes">
        {componente}
        </div>
        </div>
      </Fragment>
    );
  }
}

export default App;

/* React no puede renderizar mas de 1 etiqueta esa es la razon
por la cual todas las etiquetas las encerramos en una sola tipo div */
/*ClassName es para evitar conflicto y saber que ese class es de css y no de la aplicacion*/
/*En JSX siempre para agregar algo de Javascript hay que ponerlo entre llaves { }*/
/* Al mandar llamar una funcion con javascript hay que poner parentesis si queremos que se
ejecute inmediatamente sin esperar un evento, sin parentesis cuando hay un evento react antes como 
onChange o onSubmit */
/*Props es la manera stndard de administrar states para pasarlos entre componentes, se puede usar redux
cuando la aplicacion es mas grande, hay que enviar por props siempre del componente padre a los que contienen el otro.*/
/*Hay dos tipos de componentes 1 class components como nuestro formulario 2 stateless functional component que son funciones normales
o una variable con un arrow function Diferencias: caundo es class component hereda de componente el stateles no, en los stateles no se puede
utilizar "this" se utiliza directamente props, los stateles como lo dice su nombre no pueden tener state y los stateless
components tampoco pueden tener ciclo de vida de componente.*/
/*siempre se aplica un destructuring antes de return en App.js*/
