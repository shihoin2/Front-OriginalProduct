'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShopMap from '@/components/shop_info/ShopMap'
import { ShopInfo } from '@/components/shop_info/ShopInfo'
import AddProductForm from '@/components/storeProduct/AddProductForm'
import Static from '@/components/Static'
// import SearchBox from '@/components/GoogleMap';
import { Wrapper, Status } from '@googlemaps/react-wrapper'
// 商品登録ページ
export default function Page() {
    return (
        <>
            <Header link={'/'} page_title={'商品追加'} />
            <main>
                <div className="add_product">
                    <h1>商品登録</h1>
                    <AddProductForm />
                    <Static />
                    {/* <StoreProductInfo /> */}
                </div>
            </main>
            <Footer />
        </>
    )
}
