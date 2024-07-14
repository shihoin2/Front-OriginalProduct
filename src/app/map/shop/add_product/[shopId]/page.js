'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShopIdAddProduct from '@/components/storeProduct/ShopIdAddProduct'

// 商品登録ページ
export default function Page() {
    return (
        <>
            <Header link={'/'} page_title={'商品追加'} />
            <main>
                {/* <div className="add_product"> */}
                    {/* <Static onFileSelect={handleFileSelect} /> */}
                    <ShopIdAddProduct />
                    {/* <button onClick={handleFormSubmit}>登録</button> */}
                    {/* <StoreProductInfo /> */}
                {/* </div> */}
            </main>
            <Footer />
        </>
    )
}
