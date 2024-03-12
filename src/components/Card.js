import Link from 'next/link'
// import { FiMapPin } from "react-icons/fi"


export default function Page({ link, text, card_icon }) {
  return (
    <>
      <div class="max-w-sm rounded overflow-hidden shadow-lg card">
        <div class="px-6 py-4">
          <div className='card_icon'>{card_icon}</div>
          <div class="font-bold text-xl mb-2 card_title" className='card_title'>{text}からさがす</div>
        </div>
      </div>
    </>
  )
}
