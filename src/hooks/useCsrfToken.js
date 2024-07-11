import { useState, useEffect } from 'react'
import axios from 'axios'

const useCsrfToken = () => {
    const [csrfToken, setCsrfToken] = useState('')

    useEffect(() => {
        // CSRFトークンを取得
        const fetchCsrfToken = async () => {
            const response = await axios.get(
                // 'https://osyokuzi.site/api/csrf-token',
                'http://localhost/api/csrf-token',

                {
                    withCredentials: true,
                },
            )
            setCsrfToken(response.data.csrf_token)
        }

        fetchCsrfToken()
    }, [])
    return csrfToken
}

export default useCsrfToken
