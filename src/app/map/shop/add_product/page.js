'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AddProductForm from '@/components/storeProduct/AddProductForm'

// 商品登録ページ
export default function Page() {
    // const formRef = useRef(null)
    // const [imageUrl, setImageUrl] = useState('')
    // const [file, setFile] = useState(null)

    // const handleFileSelect = selectedFile => {
    //     setFile(selectedFile)
    // }

    // const handleFormSubmit = async () => {
    //     if (!file) {
    //         console.error('No file selected')
    //         return
    //     }

    //     const csrfToken = formRef.current.csrfToken
    //     if (!csrfToken) {
    //         console.error('CSRF token is missing')
    //         return
    //     }

    //     const formData = new FormData()
    //     formData.append('product_pic', file)
    //     formData.append('_token', csrfToken)

    //     try {
    //         const uploadResponse = await axios.post(
    //             'http://localhost/api/mogu_search/image',
    //             formData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     'X-CSRF-TOKEN': csrfToken,
    //                 },
    //                 withCredentials: true,
    //             },
    //         )

    //         if (uploadResponse.status === 200) {
    //             const imageUrl = uploadResponse.data.url
    //             setImageUrl(imageUrl)

    //             // フォームデータを取得して送信
    //             const formData = formRef.current.getFormData()
    //             formData.image_url = imageUrl

    //             const productResponse = await axios.post(
    //                 'http://localhost/api/mogu_search/product',
    //                 formData,
    //                 {
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'X-CSRF-TOKEN': csrfToken,
    //                     },
    //                     withCredentials: true,
    //                 },
    //             )

    //             if (productResponse.status === 200) {
    //                 console.log('Product added successfully')
    //             } else {
    //                 console.log('Failed to add product')
    //             }
    //         } else {
    //             console.log('Failed to upload image')
    //         }
    //     } catch (error) {
    //         console.error(`An error occurred: ${error.message}`)
    //     }
    // }

    // const handleFormSubmit = async () => {
    //     const formData = formRef.current.getFormData()
    //     formData.image_url = imageUrl

    //     try {
    //         const response = await axios.post(
    //             'http://localhost/api/mogu_search/image', // あなたのエンドポイント
    //             formData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'X-CSRF-TOKEN': formRef.current.csrfToken,
    //                 },
    //                 withCredentials: true,
    //             },
    //         )

    //         if (response.status === 200) {
    //             console.log('Product added successfully')
    //         } else {
    //             console.log('Failed to add product')
    //         }
    //     } catch (error) {
    //         console.log(`An error occurred: ${error.message}`)
    //     }
    // }

    return (
        <>
            <Header link={'/'} page_title={'商品追加'} />
            <main>
                <div className="add_product">
                    <h1>商品登録</h1>
                    {/* <Static onFileSelect={handleFileSelect} /> */}
                    <AddProductForm />
                    {/* <button onClick={handleFormSubmit}>登録</button> */}
                    {/* <StoreProductInfo /> */}
                </div>
            </main>
            <Footer />
        </>
    )
}
