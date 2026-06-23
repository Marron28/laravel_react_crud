import TechMaxButton from '../components/TechMaxButton';
import { useNavigate } from 'react-router-dom';
import { usePageSection } from '../hooks/usePageSections';
import { usePosts } from '../hooks/usePosts';
import PostGridFeatures from '../components/PostGridFeatures';

const plusIcon = (
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
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
    </svg>
);

export default function OurFeatures() {
    const navigate = useNavigate();
    const { section, loading: sectionLoading, isVisible } = usePageSection('Our Features');
    const { posts, loading: postsLoading } = usePosts('Our Features');

    if (!sectionLoading && !isVisible) {
        return null;
    }

    return (
        <div className="bg-[#fafafa] pt-20 pb-16 text-center" id="features">
            <h3 className="font-bold text-brand">{section?.name ?? 'Our Features'}</h3>
            <h1 className="text-[32px] font-semibold">Awesome Features</h1>
            <div className="my-6 flex gap-5 justify-center text-sm text-gray-400 items-center">
                <p>Built with Sass</p>
                <div className="w-2 h-2 bg-brand rounded-full" />
                <p>Friendly Support</p>
                <div className="w-2 h-2 bg-brand rounded-full" />
                <p>Powerful Design</p>
            </div>
            <PostGridFeatures
                posts={posts}
                loading={postsLoading || sectionLoading}
                emptyMessage="Our Features"
                onEdit={(id) => navigate(`/edit-content/${id}`)}
            />
            <div className="flex justify-center gap-5 items-center mb-12">
                <TechMaxButton onClick={() => navigate('/edit/our-features')} label="Edit" />
                <TechMaxButton
                    onClick={() => navigate('/add-features')}
                    variant="iconCircle"
                    icon={plusIcon}
                />
            </div>
        </div>
    );
}
