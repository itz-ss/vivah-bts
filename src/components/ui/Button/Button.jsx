import styles from './style/button.module.css';

export default function Button({ children, ...props }) {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
}
