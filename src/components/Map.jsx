import * as React from 'react';
import { useAppFormState } from './AppContext';

import GoogleMapReact from 'google-map-react';

const key = 'AIzaSyA4ecjh6HOB0rZ-Ang_lvRa7M5r5VMmMlw';

const GoogleMap = ({ children, ...props }) => (
    <div style={{marginTop: '2rem', height: '65vh'}}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key,
        }}
        {...props}
      >
        {children}
      </GoogleMapReact>
    </div>
  );

// InfoWindow component
const InfoWindow = (props) => {
    const { place } = props;
    const infoWindowStyle = {
      bottom: 150,
      left: '-45px',
      width: 220,
      backgroundColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
      padding: 10,
      fontSize: 14,
      zIndex: 100,
    };
  
    return (
      <div style={{...infoWindowStyle, position: 'relative'}}>
        <div style={{fontSize: 16}}>
          {place.formatted_address}
        </div>
      </div>
    );
  };

// Marker component
const Marker = (props) => {
    const markerStyle = {
      border: '1px solid white',
      borderRadius: '50%',
      height: 10,
      width: 10,
      cursor: 'pointer',
      zIndex: 10,
    };
    if(props.place.isFromInfectedList) {
      markerStyle["height"] = 20;
      markerStyle["width"] = 20;
    } else {
      markerStyle["backgroundColor"] = 'blue';
      markerStyle["zIndex"] = 12;
    }
    if(props.place.infected && props.place.isFromInfectedList) {
      markerStyle["backgroundColor"] = 'red';
    }

    if(props.show) {
      markerStyle["backgroundColor"] = 'yellow';
    }
  
    return (
      <React.Fragment>
        <div style={markerStyle} />
        {props.show && <InfoWindow place={props.place} />}
      </React.Fragment>
    );
};

function Map() {
    const {filter} = useAppFormState();
    const [isInfected, setIsInfected] = React.useState(false);
    const [places, setPlaces] = React.useState([]);

    React.useEffect(() => {
      fetch("infected-areas.json").then(response => response.json())
      .then((data) => {
        data.forEach((result) => {
          result.isFromInfectedList = true; // eslint-disable-line no-param-reassign
        });
        setPlaces(data);
      })
    }, [filter, setPlaces, setIsInfected])

    React.useEffect(() => {
      if(filter.user) {
        let apiresource = Number(filter.user) % 2 == 1 ? "user-infected.json" : "user-not-infected.json";

        fetch(apiresource).then(response => response.json())
        .then((response) => {
            response.forEach((result) => {
                result.show = false; // eslint-disable-line no-param-reassign
            });
            const newPlaces = [...places].filter(place => place.isFromInfectedList);
            newPlaces.push(response);
            setPlaces(newPlaces.flat());
            if(apiresource === "user-infected.json") {
              setIsInfected(true);
            } else if(apiresource === "user-not-infected.json") {
              setIsInfected(false);
            } else {
              setIsInfected(false);
            }
        });
      }
    }, [filter, setPlaces, setIsInfected]);

    // onChildClick callback can take two arguments: key and childProps
    const onChildClickCallback = (key) => {
        const newPlaces = [...places]
        const index = newPlaces.findIndex((e) => e.id === key);
        newPlaces[index].show = !newPlaces[index].show; 
        setPlaces(newPlaces);
    };

    return (
        <React.Fragment>
            <h2>{isInfected ? 'You are infected': 'You are not infected, showing all infected places'}</h2>
          { places && places.length > 0 && (
            <GoogleMap
                defaultZoom={9}
                defaultCenter={[17.3850, 78.4867]}
                bootstrapURLKeys={{ key }}
                onChildClick={onChildClickCallback}
            >
                {places.map((place) =>
                (<Marker
                    key={place.id}
                    lat={place.geometry.location.lat}
                    lng={place.geometry.location.lng}
                    show={place.show}
                    place={place}
                />))}
            </GoogleMap>
          )}
        </React.Fragment>
    );
}

export default Map;