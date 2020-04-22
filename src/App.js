import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import Form from './components/Form';
import CounterCase from './components/CounterCase';
import Button from './components/Button';
import ContainerCard from './components/ContainerCard';
import CardDetails from './components/CardDetails';

const App = () => {

  const [bikes, setBike] = useState('')
  const [busqueda, setBusqueda] = useState({
    searchText: '',
    dateFrom: '',
    dateTo: '',
  });
  const [cardSelect, setCardSelect] = useState(false);
  const [bikeSelect, setBikeSelect] = useState({});
  const [pageButton, setPageButton] = useState(1);
  const [bikelocation, setBikelocation] = useState([]);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false)

  const buscarBikes = () => {
    fetch(`https://bikewise.org:443/api/v2/incidents?page=1&per_page=100&incident_type=theft&proximity_square=100`)
      .then(res => res.json())
      .then(data => {
        setBike(data.incidents)
        setIsSearching(false)
      })
      .catch(err => setError(true));
  }

  useEffect(buscarBikes, [])

  const crearFecha = (date) => {
    if (bikes) {
      let dateBike = new Date(date * 1000);
      return dateBike.toDateString()
    }
  }

  const crearUrl = () => {
    let url = new URL(`https://bikewise.org:443/api/v2/incidents`)
    url.search = new URLSearchParams({
      per_page: 100,
      query: busqueda.searchText,
      occurred_before: Date.parse(busqueda.dateTo) / 1000 || '',
      occurred_after: Date.parse(busqueda.dateFrom) / 1000 || '',
      incident_type: 'theft'
    })
    return url
  }
  
  const crearQuery = (str) => str.split(" ").join('%20');

  const handleClick = (e, bike) => {
    setCardSelect(!cardSelect);
    setBikeSelect(bike);

    const location = (query) => {
      fetch(`https://bikewise.org:443/api/v2/locations?incident_type=theft&query=${query}`)
        .then(res => res.json())
        .then(data => setBikelocation(data.features));
    }

    location(crearQuery(bike.title))
  };

  const handleChange = e => {
    if (e.target.name === 'searchText') {
      setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
    }
    else {
      setBusqueda({ ...busqueda, [e.target.name]: (e.target.value) });
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSearching(true)
    fetch(crearUrl())
      .then(res => res.json())
      .then(data => {
        setBike(data.incidents)
        setIsSearching(false)
      })
      .catch(err => setError(true));

  }

  const handleClickButtons = (info) => {
    switch (info) {
      case ('<< First'):
        setPageButton(1)
        break;
      case ('Prev'):
        if (pageButton > 1) {
          setPageButton(pageButton - 1)
        }
        break;
      case ('1'):
        setPageButton(1)
        break;
      case ('2'):
        setPageButton(2)
        break;
      case ('3'):
        setPageButton(3)
        break;
      case ('Next >>'):
        if (pageButton < 10) {
          setPageButton(pageButton + 1)
        }
        break;
      case ('Last'):
        setPageButton(10)
        break;
      default:
        setPageButton(1)
        break;
    }
  };
  return (
    <div className='main'>
      <Nav />
      <Form handleSubmit={handleSubmit} handleChange={handleChange} busqueda={busqueda} />
      <CounterCase bikes={bikes} />
      {error ?
        <div className="message-error">Ooops, somethings wen't wrong</div> :
        <div className="container-card">
          {cardSelect ?
            <CardDetails bike={bikeSelect} funcioncrearFecha={crearFecha} handleClick={handleClick} bikelocation={bikelocation} /> :
            <ContainerCard bikes={bikes} page={pageButton} funcioncrearFecha={crearFecha} handleClick={handleClick} isSearching={isSearching} />
          }
        </div>
      }
      {(error || bikes.length === 0) ? '' :
        <div className='container-button-pages'>
          {pageButton === 1 ?
            '' :
            <>
              <Button info='<< First' handleClickButtons={handleClickButtons} />
              <Button info='Prev' handleClickButtons={handleClickButtons} />
            </>
          }

          <Button info='1' handleClickButtons={handleClickButtons} />
          <Button info='2' handleClickButtons={handleClickButtons} />
          <Button info='3' handleClickButtons={handleClickButtons} />
          {pageButton === 10 ?
            '' :
            <>
              <Button info='Next >>' handleClickButtons={handleClickButtons} />
              <Button info='Last' handleClickButtons={handleClickButtons} />
            </>
          }
        </div>
      }
    </div>
  );
}

export default App;
