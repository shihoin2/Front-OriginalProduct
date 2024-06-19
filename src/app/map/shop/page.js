'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShopMap from '@/components/shop_info/ShopMap'
import { ShopInfo } from '@/components/shop_info/ShopInfo'

export default function Page() {
    return (
        <>
            <Header link={'/'} page_title={'SHOP MAP'} />
            <main>
                <div className="shop_map">
                    <ShopMap />
                    <ShopInfo />
                </div>
            </main>
            <Footer />
        </>
    )
}
