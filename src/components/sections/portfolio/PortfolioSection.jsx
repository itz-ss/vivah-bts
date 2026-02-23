"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./style/portfolioSection.module.css";
import PortfolioGrid from "./PortfolioGrid";
import PortfolioModal from "./PortfolioModal";

const SKELETON_COUNT = 3;

export default function PortfolioSection() {

  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const cleanCaption = (text = "") => {
    return text.replace(/#[^\s#]+/g, "").trim();
  };

  const loadPosts = useCallback(async (nextCursor = null) => {
    setLoading(true);

    const url = nextCursor
      ? `/api/instagram?after=${nextCursor}`
      : `/api/instagram`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      // Deduplicate posts by ID to prevent duplicates from pagination
      setPosts(prev => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newPosts = (data.data || []).filter((post) => !existingIds.has(post.id));
        return [...prev, ...newPosts];
      });
      setCursor(data.paging?.cursors?.after || null);
    } catch (err) {
      console.error("Failed to fetch instagram posts", err);
    }

    setLoading(false);
    setInitialLoading(false);
  }, []);

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadPosts]);

  return (
    <section className={styles.portfolioSection}>
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
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      <PortfolioModal
        item={selected}
        cleanCaption={cleanCaption}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
