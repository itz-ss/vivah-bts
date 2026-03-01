"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import PremiumTextReveal from "../../motion/PremiumText/PremiumTextReveal";
import styles from "./style/featuredPortfolio.module.css";
import Link from "next/link";
import PortfolioModal from "../portfolio/PortfolioModal";

// Volume Icons
function VolumeUpIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M13.5 4.06c-.22-.13-.48-.13-.7 0L7.54 7.25H3c-.55 0-1 .45-1 1v7.5c0 .55.45 1 1 1h4.54l5.26 3.19c.22.13.48.13.7 0 .22-.13.36-.36.36-.61V4.67c0-.25-.14-.48-.36-.61zM19 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM16.5 2.65v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
    );
}

function VolumeOffIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        </svg>
    );
}

// Internal Component for Each Card to maintain local state
function PortfolioCard({ item, idx, useFallback, isInView, fallbackItems, onSelect }) {
    const [muted, setMuted] = useState(true);
    const isVideo = item.media_type === 'VIDEO';

    const imageSrc = useFallback
        ? item.image
        : (isVideo ? item.thumbnail_url : item.media_url);

    const title = useFallback
        ? item.title
        : (item.caption ? item.caption.replace(/#[^\s#]+/g, "").trim().slice(0, 70) : "View Story") || "View Story";

    const category = useFallback
        ? item.category
        : (isVideo ? "Wedding Reel" : "Memory");

    const toggleMute = (e) => {
        e.stopPropagation();
        setMuted(!muted);
    };

    return (
        <div
            className={`${styles.card} ${isInView ? styles.visible : ""}`}
            style={{ transitionDelay: `${0.2 + idx * 0.15}s` }}
            onClick={() => onSelect(item)}
        >
            <div className={styles.imageWrapper}>
                {isVideo && !useFallback ? (
                    <>
                        <video
                            src={item.media_url}
                            autoPlay
                            loop
                            muted={muted}
                            playsInline
                            className={styles.video}
                        />
                        <button
                            className={styles.muteBtn}
                            onClick={toggleMute}
                            aria-label={muted ? "Unmute" : "Mute"}
                        >
                            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                        </button>
                    </>
                ) : (
                    <img
                        src={imageSrc}
                        alt={title}
                        className={styles.image}
                        loading="lazy"
                        onError={(e) => {
                            if (!useFallback && fallbackItems?.[idx]) {
                                e.currentTarget.src = fallbackItems[idx].image;
                            } else if (fallbackItems?.[0]) {
                                e.currentTarget.src = fallbackItems[0].image;
                            }
                        }}
                    />
                )}
                <div className={styles.overlay}>
                    <span className={styles.viewText}>
                        {isVideo ? "Play Reel" : "View Photo"}
                    </span>
                </div>
            </div>

            <div className={styles.cardContent}>
                <span className={styles.category}>{category}</span>
                <h3 className={styles.cardTitle}>{title}</h3>
            </div>
        </div>
    );
}

export default function FeaturedPortfolio({ data }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const [topPosts, setTopPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [useFallback, setUseFallback] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const cleanCaption = (text = "") =>
        text ? text.replace(/#[^\s#]+/g, "").trim() : "";

    useEffect(() => {
        const fetchTopPosts = async () => {
            try {
                const res = await fetch("/api/instagram");
                const result = await res.json();
                const posts = result.data || [];

                if (!posts || posts.length === 0) {
                    setUseFallback(true);
                    setLoading(false);
                    return;
                }

                const latest = posts.slice(0, 4);
                setTopPosts(latest);
            } catch (err) {
                console.error("Instagram fetch failed:", err);
                setUseFallback(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTopPosts();
    }, []);

    if (!data) return null;

    const displayItems = useFallback ? data.items : topPosts;

    return (
        <section className={styles.portfolioSection} ref={ref}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <PremiumTextReveal text={data.title} type="heading" delay={0.1} className={styles.title} />
                    <PremiumTextReveal
                        text={data.subtitle}
                        type="subheading"
                        delay={0.3}
                        className={styles.subtitle}
                    />
                </div>

                <div className={styles.grid}>
                    {loading &&
                        [...Array(4)].map((_, i) => (
                            <div key={i} className={styles.cardSkeleton}></div>
                        ))}

                    {!loading &&
                        displayItems.map((item, idx) => (
                            <PortfolioCard
                                key={item.id || idx}
                                item={item}
                                idx={idx}
                                useFallback={useFallback}
                                isInView={isInView}
                                fallbackItems={data.items}
                                onSelect={setSelectedPost}
                            />
                        ))}
                </div>

                <div className={styles.footer}>
                    <Link href="/portfolio" className={styles.viewAllBtn}>
                        View Full Portfolio
                    </Link>
                </div>
            </div>

            <PortfolioModal
                item={selectedPost}
                onClose={() => setSelectedPost(null)}
                cleanCaption={cleanCaption}
            />
        </section>
    );
}