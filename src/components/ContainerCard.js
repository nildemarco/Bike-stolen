import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CardDetails from '../pages/CardDetails'

const ContainerCard = ({bikes, funcioncrearFecha}) => {
    return (
        <div className="container-card">
        {bikes ?
          <>
            {
              bikes.incidents.map(bike => {
                return (
                  <Router>
                    <Link to="/CardDetails">
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
                  </Link>
                  <Switch>
                    <Route path='/CardDetails'>
                      <CardDetails bike={bike} funcioncrearFecha={funcioncrearFecha}/>
                    </Route>
                  </Switch>
                  </Router>
                )
              })
            }
          </> :
          <div>Loading...</div>
        }
      </div>

    );
}
export default ContainerCard;