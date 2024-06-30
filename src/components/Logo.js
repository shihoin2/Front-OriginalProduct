import Image from 'next/image'

export default function Page() {
    return (
        <Image
            // src="/MoguLogo.svg"
            src="/MoguSaLogo.png.svg"
            width={30}
            height={30}
            alt="WEAVE"
            priority
        />
    )
}
