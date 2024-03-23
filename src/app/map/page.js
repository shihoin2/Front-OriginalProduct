"use client"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Map from "@/components/ShopMap";
import { MapMarker } from "@/components/MapMarker";
import SearchBox from '@/components/SearchBox';
import { Wrapper, Status } from "@googlemaps/react-wrapper"

export default function Page() {

return (
    <>
      <Header link={'/'} page_title={'Map'} />
      <main>
      <div className='google_map'>

          {/* <Map /> */}
          <SearchBox />
          {/* <MapMarker /> */}
        </div>
      </main>
      <Footer />
    </>

  );
}
