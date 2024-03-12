"use client"

import {
  GoogleMap,
  LoadScript,
  MarkerF
} from "@react-google-maps/api";

const defaultLatLng={
  lat:35.658584,
  lng:139.745433

  //地図の真ん中に表示させたい場所の緯度、経度を連数配列にします。
  //ここでは東京タワーの座標を使用しています。
}

const containerStyle={
  width:"100%",
  height: "85vh"
  //地図の幅と高さを連想配列にします。
  //ちなみにこのライブラリの地図はmapContainerStyleイベントでしか
  //サイズ変更できません(多分)
};
const position = {
  lat:35.658584,
  lng:139.745433
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
export default function Googlemap  () {
  return (<>
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap center={defaultLatLng}
        zoom={15}
        //zoomでデフォルトで表示される地図の範囲を指定します。
        mapContainerStyle={containerStyle}>
          <MarkerF position={position} />
      </GoogleMap>
    </LoadScript>
  </>)
}


// import { useRef, useEffect, useState } from 'react';

// export default function Map () {
// // 最初にMapを表示する時の設定
// const ref = useRef(null);
// const [map, setMap] = useState();

// useEffect(() => {
//   if (ref.current && !map) {
//     setMap(new window.google.maps.Map(ref.current, {
//       center: {
//         lat: 35.6809591,
//         lng: 139.7673068,
//       },
//       zoom: 16,
//     }));
//   }
// }, [ref, map]);

// // width指定がないと描画されない。
// const VIEW_STYLE = {
//   width: '100%',
//   height: '100vh'
//   // aspectRatio: '16 / 9',
// }

//   return (
//     <div style={VIEW_STYLE} ref={ref} />
//   );
// };
