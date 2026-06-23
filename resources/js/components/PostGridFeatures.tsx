import { useEffect, useState } from 'react';
import TechMaxButton from './TechMaxButton';

interface Post {
    id: number;
    title: string;
    description: string;
    image: string | null;
}

function PostCard({ post, onClick }: { post: Post; onClick?: () => void }) {
    const [imageLoaded, setImageLoaded] = useState(!post.image);

    useEffect(() => {
        setImageLoaded(!post.image);
    }, [post.id, post.image]);

    return (
        <div
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onClick={onClick}
            onKeyDown={
                onClick
                    ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onClick();
                          }
                      }
                    : undefined
            }
            className={`feature-card flex h-full min-h-[200px] flex-col items-center justify-center bg-white px-4 py-10 text-center ${onClick ? 'cursor-pointer' : ''}`}
        >
            {post.image ? (
                <div className="relative mb-auto flex min-h-16 items-center justify-center">
                    {!imageLoaded && (
                        <div className="h-16 w-16 animate-pulse rounded-md bg-gray-200" />
                    )}
                    <img
                        src={`/storage/${post.image}`}
                        alt={post.title}
                        className={`m-auto max-h-16 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'absolute opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                    />
                </div>
            ) : (
                <div className="mb-auto h-16 w-16 rounded-md bg-gray-100" />
            )}
            <h1 className="mt-auto text-lg font-semibold text-[#333333]">{post.title}</h1>
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
    onView?: (id: number) => void;
};

export default function PostGridFeatures({
    posts,
    loading,
    isEditMode = false,
    emptyMessage,
    onDelete,
    onEdit,
    onView,
}: PostGridProps) {
    return (
        <div className="my-12 grid grid-cols-1 items-start gap-x-5 gap-y-10 px-8 md:grid-cols-2 lg:grid-cols-3 xl:px-52">
            {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                    <PostCard
                        key={i}
                        post={{ id: 0, title: '', description: '', image: null }}
                    />
                ))
            ) : posts.length === 0 ? (
                <div className="col-span-full py-24 text-center">
                    <h2 className="text-3xl font-semibold text-gray-400">
                        Add {emptyMessage} First
                    </h2>
                </div>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="flex flex-col gap-6">
                        <PostCard
                            post={post}
                            onClick={
                                !isEditMode && onView
                                    ? () => onView(post.id)
                                    : undefined
                            }
                        />
                        {isEditMode && (
                            <div className="flex items-center justify-center gap-5">
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
