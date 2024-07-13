import { useState, useEffect } from 'react'
import axios from 'axios'

const useCsrfToken = () => {
    const [csrfToken, setCsrfToken] = useState('')

    useEffect(() => {
        // CSRFトークンを取得
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get(

                    'https://osyokuzi.site/api/csrf-token',

                    {
                        withCredentials: true,
                    },
                )
                console.log('CSRF Token:', response.data.csrf_token)
                setCsrfToken(response.data.csrf_token)
            } catch (error) {
                console.error('Failed to fetch CSRF token', error)
            }
        }
        fetchCsrfToken()
    }, [])
    return csrfToken
}

export default useCsrfToken
