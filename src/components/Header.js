import Logo from '@/components/Logo'
import Link from 'next/link'
import { FaUser } from "react-icons/fa6"
import { FaBell } from "react-icons/fa"

export default function Page({ link, page_title }) {
  return (
    <header>
      <h1>
        <Link href={'/'}>
          <Logo />
        </Link>
      </h1>
      <div className={'page_title'}>
        {page_title}
      </div>

      <div className={'link_btn'}>
        <div className='header_icon'>
        <Link href={link}><FaUser size={'20px'}/></Link>
        </div>
        <div className='header_icon'>
        <Link href={link}><FaBell size={'20px'}/></Link>
        </div>
      </div>

    </header>
  )
}
