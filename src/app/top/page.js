import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Card from '@/components/Card'
import { IconContext } from 'react-icons'
import { FiMapPin } from 'react-icons/fi'
import { GrMapLocation } from 'react-icons/gr'
import { BiCategory } from 'react-icons/bi'

export const metadata = {
    title: 'MoguSearch',
}

const Home = () => {
    return (
        <>
            <Header link={'/'} page_title={'Top'} />
            <main>
                <div className="cards">
                    <Card
                        card_icon={<FiMapPin size={'30px'} />}
                        text={'現在地'}
                    />
                    <Card
                        card_icon={<GrMapLocation size={'30px'} />}
                        text={'地域'}
                    />
                    <Card
                        card_icon={<BiCategory size={'30px'} />}
                        text={'カテゴリ'}
                    />
                </div>
            </main>
            <Footer />
        </>
    )
}
export default Home
