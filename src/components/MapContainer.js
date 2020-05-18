import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


let mapStyles = {
    position: 'inherit',
    width: '400px',
    height: '150px',
};
let containerStyle = {
    position: 'relative',
    width: '60%',
    height: '50%',
    margin: '4px',
};

if(window.innerWidth<430){
    console.log('estoy estilando mapa')
    mapStyles = {
        position: 'inherit',
        width: '300px',
        height: '100px',
    };
    containerStyle = {
        position: 'relative',
        width: '40%',
        height: '30%',
        marginTop: '4px',
        marginBoton: '5px'
    };
}
if(window.innerWidth<321){
    console.log('estoy estilando mapa')
    mapStyles = {
        position: 'inherit',
        width: '230px',
        height: '100px',
    };
    containerStyle = {
        position: 'relative',
        width: '40%',
        height: '30%',
        marginTop: '4px',
        marginBoton: '5px'
    };
}
const MapContainer = (props) => {
    
    return ( 
        <>
        { props.bikelocation.length?
        <Map
            google={props.google}
            zoom={15}
            style={mapStyles}
            containerStyle={containerStyle}
            initialCenter={{ 
                lat: props.bikelocation[0].geometry.coordinates[1], 
                lng: props.bikelocation[0].geometry.coordinates[0]
            }}
        >
            <Marker position={{ 
                lat: props.bikelocation[0].geometry.coordinates[1],
                lng: props.bikelocation[0].geometry.coordinates[0]
            }} />
        </Map> :
        <div>Loading Maps...</div>
        }
        </>  
    );
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);