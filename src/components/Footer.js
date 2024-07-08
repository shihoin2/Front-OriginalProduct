import { FaSearch } from 'react-icons/fa'
import { GoHeartFill } from 'react-icons/go'
import { IoDocumentText } from 'react-icons/io5'
import Logo from '@/components/Logo'
import Link from 'next/link'

export default function Page() {
    return (
        <footer>
            {/* <div className="footer_icon">
                <FaSearch size={'20px'} />
            </div>
            <div className="footer_icon">
                <GoHeartFill size={'20px'} />
            </div>
            <div className="footer_icon">
                <IoDocumentText size={'20px'} />
            </div> */}

            <div className="w-full max-w-screen-xl mx-auto py-5">
                <div className="sm:flex sm:items-center sm:justify-between">
                    {/* <div className="relative size-12">
                        <Link href={'/'}>
                            <Logo />
                        </Link>
                    </div> */}
                    {/* <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                ホーム
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                マップ
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul> */}
                </div>
                {/* <hr className="border-gray-200 sm:mx-auto" /> */}
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    &copy;2024
                    <a href="#" className="hover:underline">
                        もぐさぽ
                    </a>
                </span>
            </div>
        </footer>
    )
}
