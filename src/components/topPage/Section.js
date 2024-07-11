import TopImage from '@/components/topPage/TopImage'
const Section = ({
    section_title,
    section_subtitle,
    section_summary,
    section_contents,
    custom_contents,
}) => {
    return (
        <>
            <section className="mx-10">
                <div className="container mx-auto flex flex-col">
                    <div className="">
                        {/* <div className="sm:w-full mx-auto"> */}

                        <div className="flex flex-col mt-10  justify-items-center">
                            <div className="text-center">
                                <div className="flex flex-col items-center text-center justify-center">
                                    <h2 className="mt-4">{section_title}</h2>

                                    <p className="text-base">
                                        {section_subtitle}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full h-1 bg-gray-200 rounded mt-2 mb-4" />

                            {/* <div className="border-gray-200  border-t mt-4 pt-4 text-center"> */}
                            <div className="mt-4 pt-4 text-center ">
                                <p className="leading-relaxed text-lg mb-4 ">
                                    {section_summary}
                                </p>

                                {custom_contents ? (
                                    <div className="leading-relaxed text-lg mb-4">
                                        {custom_contents}
                                    </div>
                                ) : (
                                    <div className="leading-relaxed text-lg mb-4 ">
                                        {section_contents}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Section
