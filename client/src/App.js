
import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import StarRateIcon from '@mui/icons-material/StarRate';
import './index.css';
import axios from 'axios';
import { format } from 'timeago.js';


// const MAPBOX_TOKEN = ''; // Set your mapbox token here

function App() {
  const [pins, setPins] = React.useState([]);
  const [currentLocationId, setCurrentLocationId] = React.useState(null);
  const [viewState, setViewState] = React.useState({
    longitude: -105.6836,
    latitude: 40.3428,
    zoom: 4
  });

  React.useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins');
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleIconClick = (id) => {
    setCurrentLocationId(id);
  }

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {pins.map(pin => (

        <>
          <Marker
            longitude={pin.long}
            latitude={pin.lat}
          >
            <AddLocationIcon
              style={{ fontSize: viewState.zoom * 4, color: 'blue' }}
              onClick={() => handleIconClick(pin._id)}
            />
          </Marker>
          {pin._id === currentLocationId && (
            <Popup
              longitude={pin.long}
              latitude={pin.lat}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
              onClose={() => setCurrentLocationId(null)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{pin.title}</h4>
                <label>Review</label>
                <p className="desc">{pin.description}</p>
                <label>Rating</label>
                <div className="star">
                  <StarRateIcon />
                  <StarRateIcon />
                  <StarRateIcon />
                  <StarRateIcon />
                  <StarRateIcon />
                </div>
                <label>Information</label>
                <span className="username">Created by <b>{pin.username}</b></span>
                <span className="date">{format(pin.createdAt)}</span>
              </div>
            </Popup>
          )}

        </>
      ))}
    </Map>
  );
}

export default App;



