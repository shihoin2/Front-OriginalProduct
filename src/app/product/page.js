'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DisplayImage from '@/components/description/DisplayImage'
import ProductList from '@/components/description/ProductList'

export default function Page() {
    return (
        <>
            <Header link={'/'} page_title={'Product'} />
            <main>
                <div className="">
                    <ProductList />
                </div>
            </main>
            <Footer />
        </>
    )
}
