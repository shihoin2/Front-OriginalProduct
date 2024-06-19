// 商品情報の登録(画像以外)

import useCsrfToken from '@/hooks/useCsrfToken'
import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react'
import { useForm } from 'react-hook-form'

const AddProductForm = forwardRef((props, ref) => {
    const { register, handleSubmit, getValues } = useForm({
        defaultValues: {
            'JDD2021-code': '',
            'FFPWD-code': '',
            'UDF-code': '',
            'SCF-code': '',
        },
    })

    const csrfToken = useCsrfToken()

    // useImperativeHandleで親からアクセスできる関数を定義
    useImperativeHandle(ref, () => ({
        // フォームのデータを取得する関数
        getFormData: () => getValues(),
        // フォームを送信する関数
        submitForm: () => handleSubmit(onSubmit)(),
    }))

    // フォームが送信されたときに実行される関数
    const onSubmit = async data => {
        if (!csrfToken) {
            console.error('CSRF token is missing')
            return
        }
        try {
            const response = await axios.post(
                'http://localhost/api/mogu_search/image',
                {
                    ...data,
                    _token: csrfToken,
                },
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken, // ここでCSRFトークンを送信
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
                {/* <button type="submit">登録</button> */}
            </form>
        </div>
    )
})

export default AddProductForm
