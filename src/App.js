import React ,{useEffect,useState}from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizar from './components/Cotizar';
import styled from '@emotion/styled';
import Axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;


function App() {
  const [moneda,guardarMoneda] = useState('');
  const [criptomoneda,guardarCripto]= useState('');
  const [resultado,guardarResultado] = useState({});
  const [cargando,guardarCargando] = useState(false);


  useEffect(() => {
    const cotizarCriptomoneda = async() => {
      if(moneda === '') return;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await Axios.get(url);
      guardarCargando(true);
      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda] );
      },3000);
    
      
    
  
    }
    cotizarCriptomoneda();
  } , [moneda,criptomoneda]);

  const componente = (cargando) ? <Spinner /> :  <Cotizar resultado = {resultado}/>;
  return ( 
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen logo"
        />
      </div>
      <div>
      <Heading>Cotiza tus criptomonedas al instante</Heading>
      {componente}
      <Formulario
        guardarMoneda={guardarMoneda}
        guardarCripto= {guardarCripto}
      />
      
      </div>
    </Contenedor>
  );
}

export default App;
