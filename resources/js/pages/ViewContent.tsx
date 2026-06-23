import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageNavbar from '../components/PageNavbar';
import TechMaxButton from '../components/TechMaxButton';
import FooterTechMax from '../section/Footer';

function getSectionHash(sectionName: string): string {
    if (sectionName === 'Unique Home Page') return 'demo';
    if (sectionName === 'Stunning Inner Pages') return 'inner-pages';
    if (sectionName === 'Our Features') return 'features';
    return '';
}

function SectionTitle({ sectionName }: { sectionName: string }) {
    if (sectionName === 'Our Features') {
        return (
            <div className="mb-12 text-center">
                <h3 className="font-bold text-brand">{sectionName}</h3>
                <h1 className="text-[32px] font-semibold text-[#333333]">Awesome Features</h1>
            </div>
        );
    }

    return (
        <h1 className="mb-12 text-center font-[Manrope,sans-serif] text-[48px] font-semibold text-[#333333]">
            {sectionName}
        </h1>
    );
}

export default function ViewContent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [sectionName, setSectionName] = useState('');
    const [loading, setLoading] = useState(true);

    const isFeature = sectionName === 'Our Features';

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
                <PageNavbar />
                <div className="flex min-h-[50vh] items-center justify-center px-4 py-24">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
                </div>
                <FooterTechMax />
            </>
        );
    }

    return (
        <>
            <PageNavbar />
            <div className="flex flex-col items-center px-4 py-12 pb-20 sm:px-6">
                {sectionName && <SectionTitle sectionName={sectionName} />}
                <div className="flex w-full max-w-2xl flex-col rounded-lg bg-white p-6 shadow-lg md:p-10">
                    <h2 className="mb-12 text-center text-3xl font-bold text-brand">{title}</h2>

                    {image && (
                        <>
                            <label className="mb-2 text-lg font-bold">Image</label>
                            {isFeature ? (
                                <div className="mb-6 flex items-center justify-center rounded-xl border border-gray-300 bg-gray-50 px-4 py-10">
                                    <img
                                        src={`/storage/${image}`}
                                        alt={title}
                                        className="max-h-24 object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="mb-6 overflow-hidden rounded-xl border border-gray-300 shadow-sm">
                                    <div className="relative aspect-square w-full">
                                        <img
                                            src={`/storage/${image}`}
                                            alt={title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <label className="mb-2 text-lg font-bold">Description</label>
                    <div className="mb-6 min-h-24 rounded-md border border-gray-300 bg-gray-50 px-4 py-4 text-base font-semibold leading-relaxed text-[#333333] whitespace-pre-wrap">
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
