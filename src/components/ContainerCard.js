import React from 'react';

const ContainerCard = ({ bikes, page, funcioncrearFecha, handleClick }) => {
  return (
    <>
      {bikes ?
        <>
          {
            bikes.incidents.map((bike, i) => {
              if (((page*10) -10) <= i && i < (page*10)) {
                return (
                  <div className='card' key={bike.id} onClick={(e) => handleClick(e, bike)}>
                    <div className='container-img'>
                      {bike.media.image_url ?
                        <img alt={bike.title} src={bike.media.image_url} /> :
                        <p>Imagen no disponible</p>
                      }
                    </div>
                    <div className="container-details">
                      <h4>{bike.title}</h4>
                      <p className='description'>{bike.description}</p>
                      <p>{funcioncrearFecha(bike.occurred_at)} - {bike.address}</p>
                    </div>
                  </div>

                )
              }
            })

          }
        </> :
        <span>Loading...</span>
      }
    </>

  );
}
export default ContainerCard;