import { useState } from 'react';
import TechMaxButton from './TechMaxButton';

interface Post {
    id: number;
    title: string;
    description: string;
    image: string | null;
}

function PostCard({ post }: { post: Post }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="flex flex-col items-center py-12 justify-center shadow-lg hover:shadow-2xl transition-all duration-300 h-50">
            {post.image && !imageLoaded && (
                <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-md mb-auto" />
            )}
            {post.image ? (
                <img
                    src={`/storage/${post.image}`}
                    alt={post.title}
                    className={`m-auto max-h-16 ${!imageLoaded ? 'hidden' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                />
            ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-md mb-auto" />
            )}
            {!imageLoaded && post.image ? (
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mt-auto" />
            ) : (
                <h1 className="text-xl font-semibold mt-auto">{post.title}</h1>
            )}
        </div>
    );
}

type PostGridProps = {
    posts: Post[];
    loading: boolean;
    isEditMode?: boolean;
    emptyMessage?: string;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
};

export default function PostGridFeatures({
    posts,
    loading,
    isEditMode = false,
    emptyMessage,
    onDelete,
    onEdit,
}: PostGridProps) {
    return (
        <div className="grid xl:px-52 px-8 my-12 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 text-center items-center justify-center">
            {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                    <PostCard
                        key={i}
                        post={{ id: 0, title: '', description: '', image: null }}
                    />
                ))
            ) : posts.length === 0 ? (
                <div className="col-span-3 text-center py-24">
                    <h2 className="text-gray-400 text-3xl font-semibold">
                        Add {emptyMessage} First
                    </h2>
                </div>
            ) : (
                posts.map((post) => (
                    <div key={post.id}>
                        <PostCard post={post} />
                        {isEditMode && (
                            <div className="flex justify-center items-center gap-5 mt-6">
                                <TechMaxButton label="Edit" onClick={() => onEdit?.(post.id)} />
                                <TechMaxButton
                                    onClick={() => onDelete?.(post.id)}
                                    variant="iconCircleStylesRed"
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    }
                                />
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
