import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
    position: 'inherit',
    width: '400px',
    height: '150px',
};
const containerStyle = {
    position: 'relative',
    width: '60%',
    height: '50%',
    margin: '4px',
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