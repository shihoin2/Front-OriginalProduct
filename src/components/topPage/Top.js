import Section from '@/components/topPage/Section'
import TopImage from '@/components/topPage/TopImage'
import Logo from '@/components/Logo'
import ContentsCard from '@/components/topPage/ContentsCard'

const Top = () => {
    return (
        <div className="px-16">
            <div
                className="mt-4 w-full h-64 bg-cover flex flex-col items-center justify-center"
                style={{ backgroundImage: 'url(/top_bg_color.png)' }}
            >
                <div class="relative size-20 sm:size-28">
                    <Logo />
                </div>
                <h1 className="font-bold">自宅での安全な食事をサポート</h1>
            </div>
            <Section
                section_title={'「もぐさぽ」とは'}
                section_subtitle={'About'}
                section_summary={
                    '「嚥下調整食」が必要な方が、自宅で安心して食べられる。そんな支援がしやすいように情報を提供することを目的としています。'
                }
                section_contents={
                    '飲み込みや咀嚼がしづらくなった方に適した食事は「嚥下調整食」と呼ばれています。地域で暮らし続ける際に、その方の自宅付近に、食べる機能にあった食事が販売されているのかどうか、あらかじめ知ることが困難なのが現状です。地域で暮らし続けるサポートをする為に、様々なコンテンツを用意しました。'
                }
            />

            <Section
                section_title={'「もぐさぽ」のサービス'}
                section_subtitle={'Contents'}
                section_summary={
                    '「嚥下調整食」が必要な方の、自宅で安心して食べる支援のために以下のコンテンツを用意しました。'
                }
                custom_contents={
                    <>
                        <ContentsCard
                            link={'/map'}
                            src={'/map_dummy.jpg'}
                            alt={'マップ画像'}
                            contents_card_title={'地図から取り扱い店舗を検索'}
                            contents_card_description={
                                '現在地や住所から、周辺にある嚥下調整食取り扱い店舗を検索できます。'
                            }
                        />
                        <ContentsCard
                            link={'/product'}
                            src={'/engesyokuhin.png'}
                            alt={'嚥下調整食'}
                            contents_card_title={'商品から販売店舗を探す'}
                            contents_card_description={
                                '買いたい商品から、販売されている店舗を探すことができます。商品のレビューをみることもできます。'
                            }
                        />
                        <ContentsCard
                            link={'#'}
                            src={'/kaigosyoku.jpg'}
                            alt={'介護食画像'}
                            contents_card_title={'嚥下調整食レシピ'}
                            contents_card_description={
                                '嚥下調整食のレシピを紹介します。自分のレシピも投稿できます'
                            }
                            isUnderConstruction={true}
                        />
                    </>
                }
            />
        </div>
    )
}
export default Top
