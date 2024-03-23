"use client"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Map from "@/components/ShopMap";
import DisplayImage from "@/components/description/DisplayImage"
import SearchBox from '@/components/SearchBox';
import { Wrapper, Status } from "@googlemaps/react-wrapper"

export default function Page() {

return (
    <>
      <Header link={'/'} page_title={'Shop'} />
      <main>
      <div className='google_map'>

          {/* <Map /> */}
          <DisplayImage />
        </div>
      </main>
      <Footer />
    </>

  );
}
