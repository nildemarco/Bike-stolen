import React from 'react';
import MapContainer from './MapContainer'

const CardDetails = ({bike, funcioncrearFecha, handleClick, bikelocation}) =>{
    return (
    <div className='card' key={bike.id} onClick={(e)=>handleClick(e,bike)}>
    <div className='container-img'>
      {bike.media.image_url ?
        <img alt={bike.title} src={bike.media.image_url} /> :
        <p>Imagen no disponible</p>
      }
    </div>
    <div className="container-details">
      <h4>{bike.title}</h4>
      <div className='container-map'>
      <MapContainer bikelocation={bikelocation}/>      
      </div>
      <p className='description'>{bike.description}</p>
      <p>{funcioncrearFecha(bike.occurred_at)} - {bike.address}</p>
    </div>
  </div>
  );
}
export default CardDetails;