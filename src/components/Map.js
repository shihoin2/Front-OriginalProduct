'use client'
import React, { useEffect, useState, useRef } from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import axios from 'axios'
// import SearchBox from '@/components/SearchBox';

export default function Map() {
    // class App extends Component {
    const [locationName, setLocationName] = useState('')
    const [center, setCenter] = useState({ lat: 34.6688, lng: 135.1222 })
    // const [center, setCenter] = useState({ lat: '', lng: '' })
    const [isShowMarker, setIsShowMaker] = useState(false)
    const [currentPosition, setCurrentPosition] = useState({
        lat: 34.6688,
        lng: 135.1222,
    })
    const [mapMarker, setMapMaker] = useState([])
    const [placeRequest, setPlaceRequest] = useState('')
    const mapRef = useRef()

    // ページ表示時の場所設定
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error)
    }, [])

    const success = data => {
        const successPosition = {
            lat: data.coords.latitude,
            lng: data.coords.longitude,
        }
        setCurrentPosition(successPosition)
        setCenter(successPosition)
    }
    const error = () => {
        const errorPosition = {
            lat: 34.6688,
            lng: 135.1222,
        }
        setCurrentPosition(errorPosition)
        setCenter(errorPosition)
    }

    useEffect(() => {
        getMapData()
    }, [])

    const getMapData = async () => {
        try {
            const response = await axios.get(
                'http://localhost/api/mogu_search/shop',
            )
            setMapMaker(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    // ﾌｫｰﾑ入力をsetする。
    const changeLocationName = e => {
        // 押したｷｰﾎﾞｰﾄﾞがEnterだったら
        if (e.key === 'Enter') {
            // geocode();
            places()
            return
        }
        // setLocationNameでﾌｫｰﾑ入力内容に更新
        setLocationName(e.target.value)
    }

    const geocode = () => {
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ address: locationName }, (results, status) => {
            if (status === 'OK') {
                const newCenter = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                }
                setCenter(newCenter)
                setIsShowMaker(true)
            }
        })
    }

    const createMarker = place => {
        new window.google.maps.Marker({
            position: place.geometry.location,
            map: mapRef.current,
            title: place.name,
        })
    }

    const searchNearbyPlaces = () => {
        const placesService = new window.google.maps.places.PlacesService(
            mapRef.current,
        )
        const request = {
            location: center,
            radius: 5000, // 5000メートル（5キロメートル）の範囲内で検索
            keyword: locationName,
        }
        placesService.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setMapMaker(results)
                displayNearbyPlaces(results)
                console.log(results)
            }
        })
    }

    const displayNearbyPlaces = places => {
        // リスト表示するための処理
        const placeList = document.getElementById('placeList')
        placeList.innerHTML = ''
        places.forEach(place => {
            const li = document.createElement('li')
            li.textContent = place.name
            placeList.appendChild(li)
        })
    }
    // place
    const places = () => {
        // const placesAPI = new window.google.maps.places.PlacesService(map)
        const placesAPI = new window.google.maps.places.PlacesService(
            mapRef.current,
        )
        placesAPI.findPlaceFromQuery(
            { query: locationName, fields: ['name', 'geometry'] },
            function (results, status) {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i])
                        addPlaceToList(results[i])
                    }
                    setCenter(results[0].geometry.location)
                }
            },
        )
    }

    const addPlaceToList = place => {
        // 検索結果の名前や位置情報を取得
        const name = place.name
        const location = place.geometry.location

        // リスト要素を生成
        const li = document.createElement('li')
        li.textContent = `${name} - Lat: ${location.lat()}, Lng: ${location.lng()}`

        // リストに追加
        document.getElementById('placeList').appendChild(li)
    }

    useEffect(() => {
        // locationName ステートが変更されたらリストをクリアする
        document.getElementById('placeList').innerHTML = ''
    }, [locationName])

    const containerStyle = {
        width: '100%',
        height: '85vh',
    }

    const controlOption = {
        mapTypeControl: false,
        fullscreenControl: false,
    }

    return (
        <div>
            <div>
                <input
                    // className="search_box"
                    className="block w-full rounded-md border-gray-300 px-10 shadow-sm transition-all hover:bg-gray-50 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                    type="text"
                    onChange={changeLocationName}
                    value={locationName}
                    onKeyPress={changeLocationName}
                />
                <button onClick={searchNearbyPlaces}>Search</button>
                <ul id="placeList" />
            </div>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                libraries={['places']}
            >
                <GoogleMap
                    id="map"
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={18}
                    options={controlOption}
                    onLoad={map => (mapRef.current = map)} // Map がロードされたときに mapRef に設定
                >
                    {mapMarker.map(shop => (
                        <MarkerF
                            key={shop.id}
                            position={{
                                lat: shop.latitude,
                                lng: shop.longitude,
                            }}
                        />
                    ))}
                    {/* { isShowMarker && <Marker position={center} /> } */}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}
