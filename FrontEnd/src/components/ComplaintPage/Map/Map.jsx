import { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './Map.scss';

const containerStyle = {
  width: '100%',
  height: '50vh',
};

const Map = ({ onLocationSelect, setCep, setRua, setNumero, setBairro, externalPanTo }) => {
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchCenter, setSearchCenter] = useState({ lat: -22.8934, lng: -43.3259 });
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const fetchPlaces = useCallback((center) => {
    if (!mapRef.current) return;
    const service = new window.google.maps.places.PlacesService(mapRef.current);

    service.nearbySearch(
      { location: center, radius: 5000, types: ['park', 'square'] },
      (results, status) => {
        if (status === 'OK' && results) {
          setMarkers(results.map(place => ({
            id: place.place_id,
            position: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            name: place.name,
          })));
        } else {
          console.error('Erro na busca:', status);
          setMarkers([]);
        }
      }
    );
  }, []);

  const geocodePosition = useCallback(async (lat, lng) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          alert('Endereço não encontrado para este marcador.');
          return;
        }

        const address = results[0];
        const getComponent = (type) =>
          address.address_components.find(c => c.types.includes(type))?.long_name || '';

        setCep(getComponent('postal_code'));
        const numero = getComponent('street_number');
        setNumero(numero || '');
        setBairro(getComponent('sublocality') || getComponent('neighborhood'));
        setRua(getComponent('route'));

        const newCenter = { lat, lng };
        setSearchCenter(newCenter);
        mapRef.current?.panTo(newCenter);
        fetchPlaces(newCenter);
      });
    } catch (error) {
      console.error('Erro ao buscar endereço do marcador:', error);
      alert('Erro ao buscar o endereço do marcador.');
    }
  }, [setCep, setNumero, setBairro, setRua, fetchPlaces]);


  const handleMarkerClick = useCallback((place) => {
    setSelectedPlace(place);
    onLocationSelect?.({ ...place.position, placeName: place.name });
    geocodePosition(place.position.lat, place.position.lng);
  }, [onLocationSelect, geocodePosition]);


  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    geocodePosition(lat, lng);
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    fetchPlaces(searchCenter);
  }, [searchCenter, fetchPlaces]);

  const handleRefreshSearch = () => {
    if (mapRef.current) {
      const center = {
        lat: mapRef.current.getCenter().lat(),
        lng: mapRef.current.getCenter().lng(),
      };
      setSearchCenter(center);
      fetchPlaces(center);
    }
  };

  useEffect(() => {
    if (externalPanTo && mapRef.current) {
      const newCenter = { lat: externalPanTo.lat, lng: externalPanTo.lng };
      mapRef.current.panTo(newCenter);
      setSearchCenter(newCenter);
      fetchPlaces(newCenter);
    }
  }, [externalPanTo, fetchPlaces]);

  if (loadError) return <div>Erro ao carregar o mapa</div>;
  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <section className="map-container">
      <div className="d-flex justify-content-between">
        <h3>Selecione o Local no Mapa</h3>
        <button onClick={handleRefreshSearch} className="search-button">
          Buscar Praças/Parques Nesta Área
        </button>
      </div>

      <div className="map-wrapper">
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={15}
          center={searchCenter}
          onLoad={onMapLoad}
          onClick={handleMapClick}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {selectedPlace && (
            <Marker
              position={selectedPlace.position}
              onClick={() => handleMarkerClick(selectedPlace)}
            />
          )}
        </GoogleMap>
      </div>

      {selectedPlace && <p className="m-0">Local selecionado: {selectedPlace.name}</p>}
    </section>
  );
};

export default Map;
