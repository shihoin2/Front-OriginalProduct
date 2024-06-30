import useCsrfToken from '@/hooks/useCsrfToken'
import StarRating from './StarRating'
import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const AddProductForm = () => {
    const params = useParams()
    const shopId = params.shopId
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState('')
    const formRef = useRef(null)

    const csrfToken = useCsrfToken()

    const { register, handleSubmit, getValues } = useForm({
        defaultValues: {
            'JDD2021-code': '',
            'FFPWD-code': '',
            'UDF-code': '',
            'SCF-code': '',
        },
    })
    const handleFileChange = e => {
        setFile(e.target.files[0])
    }
    // フォームが送信されたときに実行される関数
    const onSubmit = async data => {
        if (!csrfToken) {
            console.error('CSRF token is missing')
            return
        }
        if (!file) {
            setMessage('登録する画像を選んでください')
            return
        }
        const formData = new FormData()
        formData.append('product_pic', file)
        formData.append('_token', csrfToken)

        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })
        try {
            const response = await axios.post(
                'https://osyokuzi.site/api/mogu_search/image',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                },
            )

            if (response.status === 200) {
                console.log('Form submitted successfully')
            } else {
                console.log('Form submission failed')
            }
        } catch (error) {
            console.error('An error occurred during form submission:', error)
        }
    }

    return (
        <>
            <div className="AddImageForm">
                <input type="file" onChange={handleFileChange} />
                {/* <button onClick={handleUpload}>登録</button> */}
                {/* {message && <p>{message}</p>} */}
            </div>
            <div className="AddProductForm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="product-name">商品名</label>
                        <input
                            id="product-name"
                            {...register('product-name')}
                            placeholder="商品名を入力してください"
                        />
                    </div>
                    <div>
                        <label htmlFor="product-manufacturer">メーカー</label>
                        <input
                            id="product-manufacturer"
                            {...register('product-manufacturer')}
                            placeholder="メーカー名を入力してください"
                        />
                    </div>
                    <div>
                        <p>嚥下分類コード</p>
                        <p>
                            <label htmlFor="JDD2021-code">JDD2021</label>
                            <select
                                id="JDD2021-code"
                                {...register('JDD2021-code')}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    選択してください
                                </option>
                                <option value="0j">0j</option>
                                <option value="0t">0t</option>
                                <option value="1j">1j</option>
                                <option value="2-1">2-1</option>
                                <option value="2-2">2-2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </p>
                        <p>
                            <label htmlFor="FFPWD-code">FFPWD</label>
                            <select
                                id="FFPWD-code"
                                {...register('FFPWD-code')}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    選択してください
                                </option>
                                <option value="FFPWD-1">許可基準Ⅰ</option>
                                <option value="FFPWD-2">許可基準Ⅱ</option>
                                <option value="FFPWD-3">許可基準Ⅲ</option>
                            </select>
                        </p>
                        <p>
                            <label htmlFor="UDF-code">UDF</label>
                            <select
                                id="UDF-code"
                                {...register('UDF-code')}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    選択してください
                                </option>
                                <option value="UDF-1">かまなくてよい</option>
                                <option value="UDF-2">舌でつぶせる</option>
                                <option value="UDF-3">歯ぐきでつぶせる</option>
                                <option value="UDF-4">容易にかめる</option>
                            </select>
                        </p>
                        <p>
                            <label htmlFor="SCF-code">スマイルケア食</label>
                            <select
                                id="SCF-code"
                                {...register('SCF-code')}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    選択してください
                                </option>
                                <option value="SCF-0">0</option>
                                <option value="SCF-1">1</option>
                                <option value="SCF-2">2</option>
                                <option value="SCF-3">3</option>
                                <option value="SCF-4">4</option>
                            </select>
                        </p>
                    </div>
                    <button type="submit">登録</button>
                </form>
            </div>
        </>
    )
}

export default AddProductForm
