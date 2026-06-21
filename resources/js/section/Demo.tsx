import TechMaxButton from '../components/TechMaxButton';
import { useNavigate } from 'react-router-dom';
import { usePageSection } from '../hooks/usePageSections';
import { usePosts } from '../hooks/usePosts';
import PostGridDemo from '../components/PostGridDemo';

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

type DemoSectionProps = {
    sectionName: string;
    editPath: string;
    addPath: string;
    id?: string;
    className?: string;
};

function DemoSection({
    sectionName,
    editPath,
    addPath,
    id,
    className = 'pt-12',
}: DemoSectionProps) {
    const navigate = useNavigate();
    const { section, loading: sectionLoading, isVisible } = usePageSection(sectionName);
    const { posts, loading: postsLoading } = usePosts(sectionName);

    if (!sectionLoading && !isVisible) {
        return null;
    }

    return (
        <div className={className} id={id}>
            <h1 className="text-center font-semibold xl:text-5xl text-4xl mb-4">
                {section?.name ?? sectionName}
            </h1>
            {section?.setting?.subtitle && (
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto px-4">
                    {section.setting.subtitle}
                </p>
            )}
            {!section?.setting?.subtitle && <div className="mb-12" />}
            <PostGridDemo
                posts={posts}
                loading={postsLoading || sectionLoading}
                emptyMessage={sectionName}
            />
            <div className="flex justify-center gap-3 items-center mb-12">
                <TechMaxButton onClick={() => navigate(editPath)} label="Edit" />
                <TechMaxButton
                    onClick={() => navigate(addPath)}
                    variant="iconCircle"
                    icon={plusIcon}
                />
            </div>
        </div>
    );
}

export default function UniqueHomePage() {
    return (
        <>
            <DemoSection
                sectionName="Unique Home Page"
                editPath="/edit/unique-home-page"
                addPath="/add-unique-home-page"
                id="demo"
                className="pt-12 mb-24"
            />
            <DemoSection
                sectionName="Stunning Inner Pages"
                editPath="/edit/stunning-inner-pages"
                addPath="/add-stunning-inner-pages"
            />
        </>
    );
}
