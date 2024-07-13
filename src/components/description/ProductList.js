import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

const ProductList = () => {
    const [allProduct, setAllProduct] = useState([])

    useEffect(() => {
        getAllProduct()
    }, [])

    const getAllProduct = async () => {
        try {
            const response = await axios.get(
                `https://osyokuzi.site/api/mogu_search/product`,
            )
            setAllProduct(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-16 mx-auto">
                <div className="text-2xl text-center py-8">登録商品一覧</div>
                <div className="flex flex-wrap -m-4">
                    {allProduct.map(product => (
                        <div
                            key={product.id}
                            className="lg:w-1/4 md:w-1/2 p-4 w-full"
                        >
                            <Link href={`/product/${product.id}`}>
                                <div className="block relative h-48 rounded overflow-hidden">
                                    <img
                                        src={product.image_path}
                                        alt={product.name}
                                        className="object-cover"
                                    />
                                    {/* <Image
                                        src={product.image_path}
                                        alt={product.name}
                                        priority
                                        fill
                                        className="object-cover"
                                    /> */}
                                </div>
                            </Link>
                            <div className="mt-4">
                                {/* <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                    CATEGORY
                                </h3> */}
                                <h2 className="text-gray-900 title-font text-lg font-medium">
                                    {product.name}
                                </h2>
                                <p className="mt-1">{product.manufacturer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductList
