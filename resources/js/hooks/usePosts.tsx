import { useCallback, useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    description: string;
    image: string | null;
}

export function usePosts(sectionName: string) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = useCallback(() => {
        setLoading(true);
        fetch(`/api/posts?section=${encodeURIComponent(sectionName)}`)
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            });
    }, [sectionName]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return { posts, loading, refetch: fetchPosts };
}
