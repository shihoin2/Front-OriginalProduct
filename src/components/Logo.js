import Image from 'next/image'

export default function Page() {
    return (
        <Image
            // src="/MoguLogo.svg"
            src="/MoguSaLogo.png.svg"
            width={50}
            height={50}
            alt="WEAVE"
            priority
        />
    )
}
