'use client'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import axios from 'axios'

const Static = () => {
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState('')
    const [csrfToken, setCsrfToken] = useState('')

    useEffect(() => {
        // CSRFトークンを取得
        const fetchCsrfToken = async () => {
            const response = await axios.get(
                'http://localhost/api/csrf-token',
                {
                    withCredentials: true,
                },
            )
            setCsrfToken(response.data.csrf_token)
        }

        fetchCsrfToken()
    }, [])

    const handleFileChange = e => {
        setFile(e.target.files[0])
    }

    const handleUpload = async () => {
        if (!file) {
            setMessage('登録する画像を選んでください')
            return
        }

        const formData = new FormData()
        formData.append('product_pic', file)
        formData.append('_token', csrfToken)

        try {
            const response = await axios.post(
                'http://localhost/api/mogu_search/image',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true, // クッキーを含める
                },
            )

            const data = response.data
            if (response.status === 200) {
                setMessage(`File uploaded successfully: ${data.url}`)
                console.log(message)
            } else {
                setMessage(`File upload failed: ${data.error}`)
                console.log(message)
            }
        } catch (error) {
            setMessage(`An error occurred: ${error.message}`)
            console.log(message)
        }
    }
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>登録</button>
            {/* {message && <p>{message}</p>} */}
        </div>
    )
}
export default Static
