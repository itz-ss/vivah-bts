import { partitionInstagramMedia } from './instagramMediaPipeline';

export const normalizeInstagramMedia = (media) => {
    const isReel = media.media_product_type === 'REELS';
    const isVideo = media.media_type === 'VIDEO';

    return {
        ...media,
        contentType: isReel ? 'reel' : isVideo ? 'video' : 'photo',
        isReel,
        isVideo,
        isPhoto: !isVideo,
        viewCount: Number(media.viewCount ?? media.plays ?? media.views ?? 0),
    };
};

export const normalizeInstagramData = (data) => {
    const normalizedMedia = (data?.data || []).map(normalizeInstagramMedia);
    const { playable } = partitionInstagramMedia(normalizedMedia);

    return {
        ...data,
        data: playable,
        counts: {
            playable: playable.length,
        },
    };
};
