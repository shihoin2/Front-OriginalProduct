import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
    return (
        <main className="flex justify-center items-center min-h-screen">
            <Image src="/MoguLogo.png" height={500} width={500} alt="暫定" />
        </main>
    )
}
