import PremiumTextReveal from '../../motion/PremiumText/PremiumTextReveal';
import styles from './style/introSection.module.css';

export default function IntroSection({ data }) {
    if (!data) return null;

    return (
        <section className={styles.introSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <PremiumTextReveal text={data.overline} type="subheading" delay={0.1} />
                    <PremiumTextReveal text={data.title} type="heading" delay={0.2} className={styles.title} />
                </div>

                <div className={styles.content}>
                    <p className={styles.description}>
                        {data.description}
                    </p>
                    <div className={styles.footerRow}>
                        <span className={styles.footerText}>{data.footerText}</span>
                        <div className={styles.aestheticLine}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
