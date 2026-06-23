import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import TechMaxButton from '../components/TechMaxButton';
import FooterTechMax from '../section/Footer';

function getSectionHash(sectionName: string): string {
    if (sectionName === 'Unique Home Page') return 'demo';
    if (sectionName === 'Stunning Inner Pages') return 'inner-pages';
    if (sectionName === 'Our Features') return 'features';
    return '';
}

export default function ViewContent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [sectionName, setSectionName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setSectionName(data.section_name ?? '');
            })
            .finally(() => setLoading(false));
    }, [id]);

    const goBack = () => {
        const hash = getSectionHash(sectionName);
        navigate(hash ? { pathname: '/', hash } : '/');
    };

    if (loading) {
        return (
            <>
                <div className="flex min-h-[50vh] items-center justify-center px-4 py-24">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
                </div>
                <FooterTechMax />
            </>
        );
    }

    return (
        <>
            <PageHero title={title} image={image} usePlaceholderWhenNoImage />

            <div className="flex justify-center px-4 py-12 pb-20 sm:px-6">
                <div className="flex w-full max-w-2xl flex-col rounded-lg bg-white p-6 shadow-lg md:p-10">
                    <label className="mb-2 text-lg font-bold">Description</label>
                    <div className="mb-6 min-h-24 rounded-md border border-gray-300 bg-gray-50 px-4 py-4 text-base font-semibold leading-relaxed whitespace-pre-wrap text-[#333333]">
                        {description}
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4">
                        <TechMaxButton type="button" label="Back" onClick={goBack} />
                        <TechMaxButton
                            type="button"
                            label="Edit"
                            onClick={() => navigate(`/edit-content/${id}`)}
                        />
                    </div>
                </div>
            </div>

            <FooterTechMax />
        </>
    );
}
