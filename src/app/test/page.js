'use client'
// import LoginLinks from '@/app/LoginLinks'
import axios from 'axios'
import { useState } from 'react'

const Home = () => {
    const [state, setState] = useState('')

    const getTest = async () => {
        try {
            const response = await axios.get('http://localhost/api/test')
            setState(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {/* 通信テスト */}
            <button onClick={getTest}>Click!!</button>
            <span>{state}</span>
        </>
    )
}
export default Home
