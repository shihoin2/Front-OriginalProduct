// import Link from 'next/link'
// import { FiMapPin } from 'react-icons/fi'

export default function Page({ link, text, card_icon }) {
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg card">
                <div className="px-6 py-4">
                    <div className="card_icon">{card_icon}</div>
                    <div className="font-bold text-xl mb-2 card_title">
                        {text}からさがす
                    </div>
                </div>
            </div>
        </>
    )
}
