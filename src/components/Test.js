import React, { useEffect, useState } from 'react';
import { Marker } from "@react-google-maps/api";
import axios from 'axios';

export function Test() {
  const [locationName, setLocationName] = useState('');
  const [map, setMap] = useState(null);
  const [mapMarker, setMapMaker] = useState([]);
  const [center, setCenter] = useState({ lat: "", lng: "" });
const [isShowMarker, setIsShowMaker] = useState(false)
const [currentPosition, setCurrentPosition] = useState();



  const success = data => {
    const currentPosition = {
      lat: data.coords.latitude,
      lng: data.coords.longitude
    }
    setCenter(currentPosition);
    setCurrentPosition(currentPosition);
  };

  const error = data => {
    const defaultPosition = {
      lat: 34.6688,
      lng: 135.1222
    }
    setCenter(defaultPosition);
    setCurrentPosition(defaultPosition);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      const sydney = new window.google.maps.LatLng(-33.867, 151.195);
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), { center: sydney, zoom: 15 });
      setMap(mapInstance); // map を設定
      getMapData();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (map) {
      const service = new window.google.maps.places.PlacesService(map);
      service.findPlaceFromQuery({ query: locationName, fields: ["name", "geometry"] }, function (results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          map.setCenter(results[0].geometry.location);
        }
      });
    }
  }, [locationName, map]);

  const getMapData = async () => {
    try {
      const response = await axios.get('http://localhost/api/mogu_search/shop')
      setMapMaker(response.data)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const changeLocationName = (e) => {
    if (e.key === 'Enter') {
      places();
      return;
    }
    setLocationName(e.target.value);
  }

  const places = () => {
    const placesAPI = new window.google.maps.places.PlacesService(map);
    placesAPI.findPlaceFromQuery({ query: locationName, fields: ["name", "geometry"] }, function (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        setCenter(results[0].geometry.location);
      }
    })
  }

  const createMarker = (place) => {
    const marker = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location,
    });

    window.google.maps.event.addListener(marker, "click", function () {
      const infowindow = new window.google.maps.InfoWindow();
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  return (
    <>
      <div className="mx-auto max-w-xs">
        <div>
          <div className="group absolute z-50 mt-2">
            <input
              type="text"
              id="example9"
              className="block w-full rounded-md border-gray-300 px-10 shadow-sm transition-all hover:bg-gray-50 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Quick search..."
              onChange={changeLocationName}
              value={locationName}
              onKeyPress={changeLocationName}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5">
              <span className="rounded border px-1.5 text-sm text-gray-400 shadow-sm transition-all group-hover:border-primary-500 group-hover:text-primary-500"><kbd>⌘</kbd> <kbd>K</kbd></span>
            </div>
          </div>
        </div>
      </div>

      <div id="map" style={{ width: "100%", height: "400px" }}></div>;

      {mapMarker.map(shop => (
        <Marker key={shop.id} position={{ lat: shop.latitude, lng: shop.longitude }} />
      ))}
    </>
  );
}
