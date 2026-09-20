"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import PortfolioGrid from "./PortfolioGrid";
import PortfolioModal from "./PortfolioModal";
import styles from "./style/portfolioSection.module.css";

const POSTS_PER_PAGE = 3;
const SKELETON_COUNT = 3;

export default function PortfolioSection() {
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref to track if initial fetch is already in progress
  const initialFetchTriggered = useRef(false);

  const cleanCaption = (text = "") => {
    return text.replace(/#[^\s#]+/g, "").trim();
  };

  const loadPosts = useCallback(async (nextCursor = null) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    // Explicitly set limit to 3 for Instagram optimization as requested
    const url = nextCursor
      ? `/api/instagram?after=${nextCursor}&limit=${POSTS_PER_PAGE}`
      : `/api/instagram?limit=${POSTS_PER_PAGE}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch Instagram posts");

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // Deduplicate posts by ID
      setPosts(prev => {
        const existingIds = new Set(prev.map((p) => p.id));
        const featured = nextCursor ? [] : (data.pinnedReels || []);
        const newPosts = [...featured, ...(data.data || [])].filter((post, index, all) =>
          !existingIds.has(post.id) && all.findIndex((candidate) => candidate.id === post.id) === index
        );
        return [...prev, ...newPosts];
      });

      // Update cursor for next page
      setCursor(data.paging?.cursors?.after || null);
    } catch (err) {
      setError("Unable to load latest Instagram works. Please try again later.");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!initialFetchTriggered.current) {
      initialFetchTriggered.current = true;
      loadPosts();
    }
  }, [loadPosts]);

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.container}>
        <SectionHeader
          badge="Instagram Live Reels & Films"
          title="Selected Cinema"
          highlight="Masterpieces"
          titleEnd=""
          description="Explore our latest Instagram wedding reels, behind-the-scenes moments, and candid couple stories captured live."
        />

        {error && (
          <div className={styles.errorContainer}>
            <p>{error}</p>
          </div>
        )}

        <PortfolioGrid
          posts={posts}
          loading={loading}
          initialLoading={initialLoading}
          skeletonCount={SKELETON_COUNT}
          cleanCaption={cleanCaption}
          onSelect={setSelected}
        />

        {cursor && !initialLoading && (
          <div className={styles.buttonWrapper}>
            <button
              className={styles.seeMoreBtn}
              onClick={() => loadPosts(cursor)}
              disabled={loading}
              type="button"
            >
              <span>{loading ? "Discovering..." : "Load More Projects"}</span>
            </button>
          </div>
        )}

        {/* End of Feed Indicator */}
        {!cursor && !initialLoading && posts.length > 0 && (
          <div className={styles.endOfFeed}>
            <p>✦ You've seen all our latest cinematic masterpieces ✦</p>
          </div>
        )}
      </div>

      <PortfolioModal
        item={selected}
        cleanCaption={cleanCaption}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
