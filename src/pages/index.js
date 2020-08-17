import React from 'react';
import { Helmet } from 'react-helmet';
import { Marker, Popup } from 'react-leaflet';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

import { useDestinations } from '../hooks';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

const LOCATION = {
  lat: 33.75,
  lng: -84.38,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;


const IndexPage = () => {
  const {destinations} = useDestinations();

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({leafletElement: map} = {}) {
    if (!map) return;
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    maxZoom: 2,
    minZoom: 2,
    mapEffect,
};

  function hasVisited(family) {
    const familyMembers = {
      oscar: 'green',
      bunny: 'teal',
      behr: 'red',
    };
     const visitors = Object.keys(family)
    return visitors.map((visitor, index ) => {
      if (!family[visitor]) {
        return <div key={index} style={{color: 'gray'}}><FiSquare size={20}/></div>;
      }

      return <div key={index} style={{color: familyMembers[visitor]}}>
        <FiCheckSquare size={20}/>
      </div>;
    })
  }

  return (
      <Layout pageName="home">
        <Helmet>
          <title>Home Page</title>
        </Helmet>

        <Map {...mapSettings} style={{ height: "70vh" }}>

            {destinations.map(destination => {
              const {id, name, location, city, state, country} = destination;
              const position = [location.latitude, location.longitude];

              return (
                  <Marker key={id} position={position}>
                    <Popup>{name} {city} {state} {country}</Popup>
                  </Marker>
              );
            })}
        </Map>

        <Container type="content" className="text-center home-start">

          <h2>Our Destinations</h2>
          <ul>
            {destinations.map(destination => {
              console.log(destination);
              const {id, name, oscar, bunny, behr} = destination;
              console.log(oscar, bunny, behr);
              return <li key={id}> {name} {hasVisited({ oscar: oscar, bunny: bunny, behr: behr })} </li>;
            })}
          </ul>
        </Container>
      </Layout>
  );
};

export default IndexPage;
