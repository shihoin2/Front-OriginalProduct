// 商品情報の登録(画像以外)

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
import { IoCloudUploadOutline } from 'react-icons/io5'
import Button from '../common/Button'

const ShopIdAddProduct = () => {
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
                // `https://osyokuzi.site/api/mogu_search/image/${shopId}`,
                `http://localhost/api/mogu_search/image/${shopId}`,

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
            <div className="flex sm:flex-row space-x-4 mx-4 w-full">
                <div className="flex items-center justify-left w-1/2">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <IoCloudUploadOutline color="gray" size={50} />

                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{' '}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="w-1/2 flex justify-items-end">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className=" text-sm text-left rtl:text-right">
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                    >
                                        <label htmlFor="product-name">
                                            商品名
                                        </label>
                                    </th>
                                    <td className="px-6 py-4">
                                        <input
                                            id="product-name"
                                            {...register('product-name')}
                                            placeholder="商品名を入力してください"
                                        />
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                    >
                                        <label htmlFor="product-manufacturer">
                                            メーカー
                                        </label>
                                    </th>
                                    <td className="px-6 py-4">
                                        <input
                                            id="product-manufacturer"
                                            {...register(
                                                'product-manufacturer',
                                            )}
                                            placeholder="メーカー名を入力してください"
                                        />
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                    >
                                        <label htmlFor="JDD2021-code">
                                            JDD2021
                                        </label>
                                    </th>
                                    <td className="px-6 py-4">
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
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                    >
                                        <label htmlFor="FFPWD-code">
                                            FFPWD
                                        </label>
                                    </th>
                                    <td className="px-6 py-4">
                                        {' '}
                                        <select
                                            id="FFPWD-code"
                                            {...register('FFPWD-code')}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                選択してください
                                            </option>
                                            <option value="FFPWD-1">
                                                許可基準Ⅰ
                                            </option>
                                            <option value="FFPWD-2">
                                                許可基準Ⅱ
                                            </option>
                                            <option value="FFPWD-3">
                                                許可基準Ⅲ
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                    >
                                        <label htmlFor="UDF-code">UDF</label>
                                    </th>
                                    <td className="px-6 py-4">
                                        {' '}
                                        <select
                                            id="UDF-code"
                                            {...register('UDF-code')}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                選択してください
                                            </option>
                                            <option value="UDF-1">
                                                かまなくてよい
                                            </option>
                                            <option value="UDF-2">
                                                舌でつぶせる
                                            </option>
                                            <option value="UDF-3">
                                                歯ぐきでつぶせる
                                            </option>
                                            <option value="UDF-4">
                                                容易にかめる
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                    >
                                        <label htmlFor="SCF-code">
                                            スマイルケア食
                                        </label>
                                    </th>
                                    <td className="px-6 py-4">
                                        {' '}
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="flex justify-end">
                            <Button
                                type={'submit'}
                                buttonName={'登録'}
                                className={'mt-2'}
                                onSubmit={onSubmit}
                            />
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ShopIdAddProduct
