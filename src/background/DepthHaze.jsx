"use client";

// import styles from "../../styles/luxury-garden.module.css";
import styles from "./styles/luxury-garden.module.css";

export default function DepthHaze() {
    return (
        <div className={styles.hazeContainer}>
            <div className={styles.depthHaze} aria-hidden="true" />
        </div>
    );
}
