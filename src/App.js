import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import Button from './components/Button';
import ContainerCard from './components/ContainerCard';
import ContainerCardDetails from './pages/ContainerCardDetails';
import CardDetails from './pages/CardDetails';

const App = () => {

  const [bikes, setBike] = useState('')
  const [busqueda, setBusqueda] = useState({
    searchText: '',
    dateFrom: '',
    dateTo: '',
  });
  const [cardSelect, setCardSelect] = useState(false)
  const [bikeSelect, setBikeSelect] = useState({})

  const buscarBikes = () => {
    fetch(`https://bikewise.org/api/v2/incidents?page=1&per_page=50&incident_type=theft&proximity_square=100`)
      .then(res => res.json())
      .then(data => setBike(data))
  }

  useEffect(buscarBikes, [])

  const crearFecha = (date) => {
    if (bikes) {
      let dateBike = new Date(date * 1000)
      return dateBike.toDateString()
    }
  }

  const crearUrl = () => {
    let url = new URL(`https://bikewise.org:443/api/v2/incidents`)
    url.search = new URLSearchParams({
      per_page: 10,
      query: busqueda.searchText,
      occurred_before: busqueda.dateTo,
      occurred_after: busqueda.dateFrom,
      incident_type: 'theft'
    })
    return url
  }
  
  const handleClick = (e, bike) => {
    setCardSelect(!cardSelect)
    setBikeSelect({bike})
  };
  
  const handleChange = e => {
    if (e.target.name === 'searchText') {
      setBusqueda({ ...busqueda, [e.target.name]: e.target.value })
    }
    else {
      setBusqueda({ ...busqueda, [e.target.name]: Date.parse(e.target.value) / 1000 })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    fetch(crearUrl())
      .then(res => res.json())
      .then(data => setBike(data))

  }
  console.log(bikes)
  console.log(busqueda)
  return (
    <div className='main'>
      <Nav />
      <form onSubmit={handleSubmit}>
        <input type='text' name='searchText' value={busqueda.searchText} placeholder="Search case descriptions" onChange={handleChange} />
        <input type='date' name='dateFrom' vale={busqueda.dateFrom} placeholder="From" onChange={handleChange} />
        <input type='date' name='dateTo' value={busqueda.dateTo} placeholder="To" onChange={handleChange} />
        <input type='submit' value='Find case' />
      </form>
      <div className="container-cases-number">
        {bikes ? <h6>Cases: {bikes.incidents.length}</h6> : ''}
      </div>
      { cardSelect? 
      <CardDetails bike={bikeSelect} funcioncrearFecha={crearFecha} handleClick={handleClick}/> :
      <ContainerCard bikes={bikes} funcioncrearFecha={crearFecha} handleClick={handleClick}/> 
      }
      <div className='container-button-pages'>
        <Button info='<< First'/>
        <Button info='Prev'/>
        <Button info='1'/>
        <Button info='2'/>
        <Button info='3'/>
        <Button info='Next >>'/>
        <Button info='Last'/>
        </div>
    </div>
  );
}

export default App;
