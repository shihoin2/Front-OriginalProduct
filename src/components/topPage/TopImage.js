import Image from 'next/image'

const TopImage = () => {
    return (
        <Image
            src="/top_bg_color.png"
            alt="もぐさぽトップ画像"
            priority
            className="h-full w-full"
            fill
        />
    )
}

export default TopImage
