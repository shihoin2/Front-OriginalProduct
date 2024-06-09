// 商品情報の登録(画像以外)
// protected $fillable = [
//   'id',
//   'name',
//   'manufacturer',
//   'image_name',
//   'imaeg_path',
//   'JDD2021_code',
//   'FFPWD_code',
//   'UDF_code',
//   'SCF_code',
//   'reviews_id',
//   'created_at',
//   'updated_at',
// ];

import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

export default function AddProductForm() {
    const { register, handleSubmit } = useForm()

    const onSubmit = data => console.log(data)

    return (
        <div className="AddProductForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="product-name">商品名</label>
                    <input id="product-name" {...register('product-name')} />
                </div>
                <div>
                    <label htmlFor="product-manufacturer">メーカー</label>
                    <input
                        id="product-manufacturer"
                        {...register('product-manufacturer')}
                    />
                </div>
                <div>
                    <p>嚥下分類コード</p>
                    <label htmlFor="JDD2021-code">JDD2021</label>
                    <select id="JDD2021-code" {...register('JDD2021-code')}>
                        <option value="0j">0j</option>
                        <option value="0t">0t</option>
                        <option value="1j">1j</option>
                        <option value="2-1">2-1</option>
                        <option value="2-2">2-2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                    <label htmlFor="FFPWD-code">FFPWD</label>
                    <select id="FFPWD-code" {...register('FFPWD-code')}>
                        <option value="0j">0j</option>
                        <option value="0t">0t</option>
                        <option value="1j">1j</option>
                        <option value="2-1">2-1</option>
                        <option value="2-2">2-2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                    <label htmlFor="UDF-code">UDF</label>
                    <input id="UDF-code" {...register('UDF-code')} />
                    <label htmlFor="SCF-code">SCF</label>
                    <input id="SCF-code" {...register('SCF-code')} />
                </div>
                <button type="submit">登録</button>
            </form>
        </div>
    )
}
