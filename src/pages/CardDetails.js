import React from 'react';

const CardDetails = ({bike, funcioncrearFecha}) =>{
    return (
    <div className='card' key={bike.id}>
    <div className='container-img'>
      {bike.media.image_url ?
        <img alt={bike.title} src={bike.media.image_url} /> :
        <span>Imagen no disponible</span>
      }
    </div>
    <div className="container-details">
      <h4>{bike.title}</h4>
      <p className='description'>{bike.description}</p>
      <p>{funcioncrearFecha(bike.occurred_at)} - {bike.address}</p>
    </div>
  </div>
  );
}
export default CardDetails;