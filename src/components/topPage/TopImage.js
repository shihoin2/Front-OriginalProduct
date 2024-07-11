import Image from 'next/image'

const TopImage = () => {
    return (
        <Image
            src="/mogusapo_top_back.png"
            alt="もぐさぽトップ画像"
            priority
            className="h-full w-full"
            fill
        />
    )
}

export default TopImage
