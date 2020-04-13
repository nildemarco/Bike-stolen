import React from 'react';

const CardDetails = ({bike, funcioncrearFecha, handleClick}) =>{
    
    return (
    <div className='card' key={bike.bike.id} onClick={(e)=>handleClick(e,bike)}>
    <div className='container-img'>
      {bike.bike.media.image_url ?
        <img alt={bike.bike.title} src={bike.bike.media.image_url} /> :
        <p>Imagen no disponible</p>
      }
    </div>
    <div className="container-details">
      <h4>{bike.bike.title}</h4>
      <p></p>
      <p className='description'>{bike.bike.description}</p>
      <p>{funcioncrearFecha(bike.bike.occurred_at)} - {bike.bike.address}</p>
    </div>
  </div>
  );
}
export default CardDetails;