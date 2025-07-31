import style from './style.module.css'
import { Animated } from '@/app/swivel/05.components';

const NoticePage = () => {
    return (
        <div className={style.section}>
            <div className={style.pageBody}>
                <Animated className={style.show} debug={true}>
                    <div className={style.titleSection}>
                        <h2 className={style.title}>
                            Swivel을 통해 경험하는 명함의 새로운 시대
                        </h2>
                        <p className={style.desc}>
                            단순한 명함 교환을 넘어, 스마트한 네트워킹의 시작!
                        </p>
                    </div>
                </Animated>
                <Animated className={style.show}>
                    <div className={style.blurBox}>
                        <div className={style.blurBoxInner}>
                            <p className={`${style.text} ${style.textMargin}`}>
                                아직도 종이 명함을 들고 다니며 정보가 바뀔 때마다 새로 만드느라 번거로우신가요? 어렵게 받은 명함은 주머니 속에서 잊히고, 기존 디지털 명함은 저장하고 관리하기 불편하셨나요?
                            </p>
                            <p className={`${style.text} ${style.textMargin} ${style.textBold}`}>
                                Swivel은 이 모든 문제점을 해결하고, 당신의 첫인상과 비즈니스 네트워킹을 혁신합니다.
                            </p>
                            <p className={`${style.text}`}>
                                Swivel은 기존 종이 명함의 한계를 넘어, 당신의 명함을 시각적으로 압도적인 디지털 경험으로 전환하고, 간편한 관리와 끊김 없는 연결을 제공하는 혁신적인 플랫폼입니다.
                            </p>
                        </div>
                    </div>
                </Animated>
            </div>
        </div>
    )
}

export default NoticePage;