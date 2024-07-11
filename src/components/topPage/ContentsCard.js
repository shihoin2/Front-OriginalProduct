import Image from 'next/image'
import Link from 'next/link'

const ContentsCard = ({
    src,
    alt,
    contents_card_title,
    contents_card_description,
    link,
    isUnderConstruction = false,
}) => {
    return (
        // <div className="container px-5 mx-auto">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center">
            {/* <div className="flex flex-wrap -m-4"> */}

            <div className="p-4 w-full sm:w-2/3">
                {/* <div className="p-4"> */}
                <Link href={link}>
                    <div className="relative flex flex-col sm:flex-row sm:space-x-2 bg-[#F7F7F7] p-6 rounded-lg">
                        {/* <div className="flex flex-col sm:flex-row sm:space-x-2 bg-[#F7F7F7] p-6 rounded-lg"> */}
                        {isUnderConstruction && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                                <span className="text-white text-2xl">
                                    準備中
                                </span>
                            </div>
                        )}
                        <div className="relative h-40 rounded w-full sm:w-1/2 object-cover object-center">
                            <Image
                                src={src}
                                alt={alt}
                                priority
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="flex flex-col sm:w-1/2">
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4 flex justify-center">
                                {contents_card_title}
                            </h2>
                            <p className="leading-relaxed text-base">
                                {contents_card_description}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>

        // </div>
    )
}

export default ContentsCard
