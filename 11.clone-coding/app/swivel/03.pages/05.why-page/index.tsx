import style from './style.module.css'
import { Animated, SVG } from '@/app/swivel/05.components';

type CardInfo = {
    title: string,
    desc: string,
    d: string,
    className: Object,
}
const cardInfo: CardInfo[] = [
    {
        title: '간편한 업로드',
        desc: '기존 명함 이미지를 업로드하기만 하면 나머지는 저희가 처리합니다.',
        d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        className: style.card1,
    },
    {
        title: '플립 애니메이션',
        desc: '모든 기기에서 완벽하게 작동하는 아름다운 카드 플립 애니메이션.',
        d: 'M13 10V3L4 14h7v7l9-11h-7z',
        className: style.card2,
    },
    {
        title: '간편한 공유',
        desc: 'URL, QR 코드 또는 소셜 미디어를 통해 공유하세요. 네트워킹 이벤트에 완벽합니다.',
        d: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z',
        className: style.card3,
    },
]

const Card = ({title, desc, d, className} : CardInfo) => {
    return (
        <div className={`${style.card} ${className}`}>
            <div className={style.icon}>
                <SVG className={style.svg} d={d}/>
            </div>
            <h3 className={style.cardTitle}>{title}</h3>
            <p className={style.cardDesc}>{desc}</p>
        </div>
    )
}

const WhyPage = () => {
    return (
        <Animated className={style.show}>
            <div className={style.section}>
                <div className={style.pageBody}>
                    <div className={style.titleSection}>
                        <h2 className={style.title}>
                            왜 디지털 명함인가요?
                        </h2>
                        <p className={style.desc}>
                            종이 명함의 한계를 넘어선 새로운 경험을 제공합니다
                        </p>
                    </div>
                    <div className={style.grid}>
                        {cardInfo.map((item, index)=>(
                            <Card key={index} {...item} />
                        ))}
                    </div>
                    <div className={style.previewSection}>
                        <div className={style.preview}>
                            <div className={style.previewTitle}>
                                명함 미리보기
                            </div>
                        </div>
                        <div className={style.preivewDesc}>
                            명함을 업로드하여 마법을 경험해보세요!
                        </div>
                    </div>
                </div>
            </div>
        </Animated>
    )
}

export default WhyPage;