'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DisplayImage from '@/components/description/DisplayImage'
import { ProductInfo } from '@/components/description/ProductInfo'

export default function Page() {
    return (
        <>
            <Header link={'/'} page_title={'Product'} />
            <main>
                <div className="product">
                    <DisplayImage />
                    <ProductInfo />
                </div>
            </main>
            <Footer />
        </>
    )
}
