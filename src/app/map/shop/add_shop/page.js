'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AddShop from '@/components/addShop/AddShop'
import {
    APIProvider,
    ControlPosition,
    Map,
    MapControl,
    useMap,
    InfoWindow,
    useMapsLibrary,
} from '@vis.gl/react-google-maps'

// 商品登録ページ
export default function Page() {
    return (
        <>
            <Header link={'/'} page_title={'店舗登録'} />
            <main>
                <APIProvider
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                    region="JP"
                    language="JP"
                >
                    <AddShop />
                </APIProvider>
            </main>
            <Footer />
        </>
    )
}
