'use client'
import Logo from '@/components/Logo'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { FaUser } from 'react-icons/fa6'
import { FaBell } from 'react-icons/fa'
import { MdOutlineAddBusiness } from 'react-icons/md'
import { RiFunctionAddLine } from 'react-icons/ri'
import { GrMap } from 'react-icons/gr'
import { FaListUl } from 'react-icons/fa'

export default function Page({ link, page_title }) {
    return (
        <header className="h-16 mx-auto">
            {/* <header class="px-5 py-5 lg:px-5 lg:pl-3"> */}
            <div className="justify-between flex flex-row mx-auto w-full max-w-7xl">
                <div className="relative size-12">
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                </div>
                {/* <div className={'page_title'}>{page_title}</div> */}

                <div
                    className="flex items-center space-x-5 justify-between w-1/6"
                    // className={'link_btn'}
                >
                    {/* <div className="basis-1/2 ml-7flex-col">
                        <Link href={`#`}>
                            <div>
                                <IconContext.Provider
                                    value={{
                                        className:
                                            'text-3xl text-[#FFCA84] ml-2',
                                    }}
                                >
                                    <MdOutlineAddBusiness />
                                </IconContext.Provider>
                            </div>
                            <div className="text-xs">店舗マスタ登録</div>
                        </Link>
                    </div> */}

                    <div className="basis-1/2">
                        <Link href={`/map`}>
                            <IconContext.Provider
                                value={{
                                    className: 'text-3xl text-[#FFCA84] ml-1',
                                }}
                            >
                                <GrMap />
                                {/* <FaBell /> */}
                            </IconContext.Provider>
                            <div className="text-xs">マップ</div>
                        </Link>
                    </div>
                    <div className="basis-1/2">
                        <Link href={`/product`}>
                            <IconContext.Provider
                                value={{
                                    className: 'text-3xl text-[#FFCA84] ml-2',
                                }}
                            >
                                <FaListUl />
                            </IconContext.Provider>
                            <div className="text-xs">商品一覧</div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
