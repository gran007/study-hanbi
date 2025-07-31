import style from './style.module.css'
import { Animated, SVG } from '@/app/swivel/05.components';

type SalesRowType = {
    title: string,
    desc: string[],
    d: string,
    cardTitle: string,
    cardDesc: string,
    orderLeft: boolean,
    className: Object,
}

const SalesRow = (
    { title, desc, d, cardTitle, cardDesc, orderLeft, className }: SalesRowType
) => {
    return (
        <div className={style.row}>
            <div className={style.grid}>
                <div className={`${orderLeft ? style.gridLeft : style.gridRight}`}>
                    <h3 className={style.gridTitle}>{title}</h3>
                    <div className={style.gridDesc}>
                        {
                            desc.map((text, index) => (
                                <p key={index} className={style.desc}>{text}</p>
                            ))
                        }
                    </div>
                </div>
                <div className={`${orderLeft ? style.gridRight : style.gridLeft}`}>
                    <div className={`${style.card} ${className}`}>
                        <div className={style.cardContentSection}>
                            <div className={style.cardContent}>
                                <SVG className={style.svg} d={d} />
                                <p className={style.cardTitle}>{cardTitle}</p>
                                <p className={style.cardDesc}>{cardDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const salesRowData: SalesRowType[] = [
    {
        title: '초간편 명함 생성: AI가 돕는 마법 같은 변환',
        desc: [
            '"Create" 버튼을 누르는 순간, 당신의 명함은 새로운 생명을 얻습니다.',
            '종이 명함의 앞/뒷면 이미지를 업로드하기만 하면, Swivel의 AI와 OCR 기술을 접목한 에이전트가 명함 속 정보를 정확하게 분석하고 추출합니다.',
            '사용자는 추출된 정보를 최종 확인하고 필요시 수정하여, 단 몇 초 만에 완벽한 디지털 명함을 완성할 수 있습니다. 복잡한 디자인 도구 없이, 당신 명함의 본질을 그대로 디지털로 가져오세요.'
        ],
        d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        cardTitle: 'AI + OCR',
        cardDesc: '자동 정보 추출',
        orderLeft: true,
        className: style.card1,
    },
    {
        title: '압도적인 시각적 매력: 살아있는 \'카드 플립\' 명함',
        desc: [
            '당신의 디지털 명함은 단순한 이미지가 아닙니다. 클릭하거나 스와이프할 때마다 앞뒷면이 부드럽게 전환되는 \'카드 플립\' 애니메이션이 적용되어, 상대방에게 강렬하고 잊을 수 없는 첫인상을 선사합니다. 당신의 전문성과 트렌디함을 동시에 어필하세요.'
        ],
        d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        cardTitle: 'Card Flip',
        cardDesc: '부드러운 애니메이션',
        orderLeft: false,
        className: style.card2,
    },
    {
        title: '스마트한 공유: 언제 어디서든, 누구에게나',
        desc: [
            '생성된 당신의 디지털 명함은 고유한 웹 주소(URL)를 가집니다.',
            '자동 생성된 QR 코드와 함께 언제, 어디서든 스마트폰으로 간편하게 공유할 수 있습니다.',
            '명함을 받은 사람은 별도의 앱 설치 없이 웹 브라우저를 통해 당신의 명함을 바로 확인할 수 있습니다.'
        ],
        d: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z',
        cardTitle: 'Smart Share',
        cardDesc: 'QR + URL',
        orderLeft: true,
        className: style.card3,
    },
];

const SalesPage = () => {
    return (
        <Animated className={style.show}>
            <div className={style.section}>
                <div className={style.pageBody}>
                    <div className={style.titleSection}>
                        <h2 className={style.title}>
                            Swivel을 통해 경험하는 명함의 새로운 시대
                        </h2>
                    </div>
                    {
                        salesRowData.map((item, index) => (
                            <SalesRow key={index} {...item} />
                        ))
                    }
                </div>
            </div>
        </Animated>
    )
}

export default SalesPage;