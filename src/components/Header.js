import Logo from '@/components/Logo'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { FaUser } from 'react-icons/fa6'
import { FaBell } from 'react-icons/fa'
import { MdOutlineAddBusiness } from 'react-icons/md'
import { RiFunctionAddLine } from 'react-icons/ri'

export default function Page({ link, page_title }) {
    return (
        <header className="h-16">
            {/* <header class="px-5 py-5 lg:px-5 lg:pl-3"> */}
            <div className="justify-between flex flex-row w-full">
                <div className="relative size-12">
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                </div>
                {/* <div className={'page_title'}>{page_title}</div> */}

                <div
                    className="flex items-center space-x-14 justify-between"
                    // className={'link_btn'}
                >
                    <div className="basis-1/2 flex-col">
                        <Link href={link}>
                            <div>
                                <IconContext.Provider
                                    value={{
                                        className:
                                            'text-3xl text-[#FFCA84] ml-2.5',
                                    }}
                                >
                                    <MdOutlineAddBusiness />
                                    {/* <FaUser /> */}
                                </IconContext.Provider>
                            </div>
                            <div className="text-xs">店舗登録</div>
                        </Link>
                    </div>
                    <div className="basis-1/2 ">
                        <Link href={link}>
                            <IconContext.Provider
                                value={{
                                    className: 'text-3xl text-[#FFCA84] ml-2.5',
                                }}
                            >
                                <RiFunctionAddLine />
                                {/* <FaBell /> */}
                            </IconContext.Provider>
                            <div className="text-xs">商品登録</div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
