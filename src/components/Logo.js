import Image from 'next/image'

export default function Page() {
    return (
        <Image
            // src="/MoguLogo.svg"
            // fill
            src="/MoguSaLogo.png.svg"
            // sizes="(min-width: 640px) 7rem, (min-width: 1200px) 50vw, 33vw"
            // width={100}
            // height={100}
            alt="もぐさぽ_icon"
            priority
            className="size-28 sm:size-44"
            fill
        />
        // <img
        //     src="/MoguSaLogo.png.svg"
        //     alt="もぐさぽ_icon"
        //     class="size-16 sm:size-28"
        // />
    )
}
