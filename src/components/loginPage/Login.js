'use client'
import React from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Logo from '@/components/Logo'

const Login = () => {
    return (
        <>
            <div className="flex h-screen">
                <div
                    className="w-1/2 h-full bg-left bg-cover flex flex-col items-center justify-center"
                    style={{ backgroundImage: 'url(/top_bg_color.png)' }}
                >
                    <div class="relative size-20 sm:size-28">
                        <Logo />
                    </div>
                    <h1 className="font-bold">自宅での食事をサポート</h1>
                    <p>
                        ご近所にある「のみこみやすい食事」を地図から見つけられます
                    </p>
                </div>
                <div className="w-1/2 h-full flex items-center justify-center">
                    <div class="w-full max-w-xs">
                        <form class="rounded px-8 pt-6 pb-8 mb-4">
                            <div class="mb-4">
                                <label
                                    class="block text-gray-700 text-sm font-bold mb-2"
                                    for="username"
                                >
                                    ユーザーネーム
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                            <div class="mb-6">
                                <label
                                    class="block text-gray-700 text-sm font-bold mb-2"
                                    for="password"
                                >
                                    パスワード
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-[#5AC1CE] text-white font-bold py-2 px-4 rounded">
                                    ログイン
                                </button>
                                <a
                                    class="inline-block align-baseline font-bold text-sm text-[#5AC1CE]"
                                    href="#"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                        <p>
                            <a
                                class="inline-block align-baseline text-sm text-[#5AC1CE] px-8 mb-4"
                                href="#"
                            >
                                新規登録
                            </a>
                        </p>
                        <p>
                            <a
                                class="inline-block align-baseline text-sm text-[#5AC1CE] px-8 mb-4"
                                href="#"
                            >
                                ログインせず利用
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
