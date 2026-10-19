const PLAYABLE_MEDIA_TYPES = new Set(['VIDEO']);
const PLAYABLE_PRODUCT_TYPES = new Set(['REELS']);

export const hasUsableMediaSource = (media) => (
    typeof media?.media_url === 'string' && media.media_url.trim().length > 0
);

export const isPlayableInstagramMedia = (media) => (
    hasUsableMediaSource(media) && (
        PLAYABLE_MEDIA_TYPES.has(media?.media_type) ||
        PLAYABLE_PRODUCT_TYPES.has(media?.media_product_type)
    )
);

export const partitionInstagramMedia = (media = []) => media.reduce(
    (partitions, item) => {
	partitions[isPlayableInstagramMedia(item) ? 'playable' : 'nonPlayable'].push(item);
	return partitions;
    },
    { playable: [], nonPlayable: [] },
);
