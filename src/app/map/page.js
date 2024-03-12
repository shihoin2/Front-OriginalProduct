"use client"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Map from "@/components/Map";
import { Wrapper, Status } from "@googlemaps/react-wrapper"

export default function Page() {

return (
    <>
      <Header link={'/'} page_title={'Map'} />
      <main>
      <div className='google_map'>

          <Map />
        </div>
      </main>
      <Footer />
    </>

  );
}
