import React, { useEffect, useState } from 'react';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import styled from '@emotion/styled';

import Axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarMoneda ,guardarCripto }) => {

    const [listacripto,guardarCriptomonedas] = useState([]);
    const [error,guardarError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo:"ARS" , nombre: "Peso Argentino" },
        { codigo: "BAM", nombre: "Bosnia y Herzegovina" },
        { codigo:"	BRL" , nombre: "Real brasileño" },
        { codigo:"CAD" , nombre:"Dolar Canadiense"  },
        { codigo:"JPY" , nombre: "Japon" }
    ];

    const [moneda,SelectMoneda] = useMoneda('Elige tu moneda',"",MONEDAS);
    const [criptomoneda,SelectCripto] = useCriptomoneda('Elige tu moneda',"",listacripto);


    useEffect(() => {
        const consultarApi = async() =>{
            
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await Axios.get(url);
            
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    },[moneda,criptomoneda]);

    const handleSubmit = e => {
        e.preventDefault();
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCripto(criptomoneda);
    }   


    return ( 
        
        <form
            onSubmit={handleSubmit}
        >
        {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMoneda />
            <SelectCripto />
            <Boton
                type="submit"
                value="Cotizar"

            />
        </form>
        
    );
}

export default Formulario;