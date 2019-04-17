import React, { Component } from 'react';

class Formulario extends Component{
    state = {
        cantidad:'',
        plazo:''
    }
    calcularPrestamo = (e) =>{
        e.preventDefault();
        //Aplicar destructuring para envier datos.
        const{cantidad,plazo} = this.state;
        document.querySelector('input[name = "cantidad"]').value ='';
        document.querySelector('select[name = "plazo"]').selectedIndex = 0;
        //pasarlo al componente padre
        this.props.datosPrestamo(cantidad,plazo);
    }
    actualizarState = (e) => {
    //Leer datos del formulario
    const {name,value} = e.target;
    //Actualizar el state
    this.setState({
        [name]: Number(value)
    });
    }

    habilitarSubmit = () =>{
    // aplicar un destructuring
        const {cantidad,plazo} = this.state;
    //leer llas variables
        const noValido = !cantidad || !plazo;
    //returnar una respuesta
        return noValido;
    }

    render(){
        return(
            <form onSubmit ={this.calcularPrestamo}>
                <div>
                    <label>Cantidad del prestamo</label>
                    <input 
                    onChange={this.actualizarState}
                    type="number" 
                    name="cantidad" 
                    className="u-full-width" 
                    placeholder="Ejemplo: 3000"/>
                </div>
                <div>
                    <label>Plazo para pagar</label>
                    <select 
                    onChange={this.actualizarState}
                    name="plazo" 
                    className="u-full-width">
                     <option value="">Seleccionar</option>
                     <option value ="3">3 Meses</option>
                     <option value="6">6 Meses</option>
                     <option value="12">12 Meses</option>
                     <option value="24">24 Meses</option>
                    </select>
                </div>
                <div>
                    <input 
                    disabled={this.habilitarSubmit()}
                    type="submit" 
                    value="Calcular" 
                    className ="u-full-width button-primary"/>
                </div>
            </form>
        );
    }
}

export default Formulario;