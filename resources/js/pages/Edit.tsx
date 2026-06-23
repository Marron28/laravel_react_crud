import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useState } from 'react';
import PostGridDemo from '../components/PostGridDemo';
import PostGridFeatures from '../components/PostGridFeatures';
import PageNavbar from '../components/PageNavbar';
import FooterTechMax from '../section/Footer';
import Alert from '../components/Alert';
import DeleteModal from '../components/DeleteModal';

export default function Edit() {
    const navigate = useNavigate();
    const { section } = useParams();

    const sectionName =
        section === 'unique-home-page'
            ? 'Unique Home Page'
            : section === 'stunning-inner-pages'
              ? 'Stunning Inner Pages'
              : section === 'our-features'
                ? 'Our Features'
                : '';

    const { posts, loading } = usePosts(sectionName);

    const [modal, setModal] = useState<{ visible: boolean; id: number | null }>({
        visible: false,
        id: null,
    });

    const [alert, setAlert] = useState<{
        type: 'success' | 'failed';
        message: string;
        visible: boolean;
    }>({ type: 'success', message: '', visible: false });

    const showAlert = (type: 'success' | 'failed', message: string) => {
        setAlert({ type, message, visible: true });
        setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
    };

    const handleConfirmDelete = async () => {
        if (!modal.id) return;

        const response = await fetch(`/api/posts/${modal.id}`, { method: 'DELETE' });

        if (response.ok) {
            setModal({ visible: false, id: null });

            const hash =
                section === 'unique-home-page'
                    ? 'demo'
                    : section === 'stunning-inner-pages'
                      ? 'inner-pages'
                      : section === 'our-features'
                        ? 'features'
                        : '';

            navigate(hash ? { pathname: '/', hash } : '/', { replace: true });
        } else {
            showAlert('failed', 'Something went wrong.');
        }
    };

    return (
        <>
            <PageNavbar />
            <DeleteModal
                visible={modal.visible}
                onConfirm={handleConfirmDelete}
                onCancel={() => setModal({ visible: false, id: null })}
            />
            <Alert type={alert.type} message={alert.message} visible={alert.visible} />
            <div className="mt-12">
                <h1 className="text-center text-brand font-bold text-3xl mb-12">{sectionName}</h1>
                {section === 'our-features' ? (
                    <PostGridFeatures
                        posts={posts}
                        loading={loading}
                        isEditMode
                        onDelete={(id) => setModal({ visible: true, id })}
                        onEdit={(id) => navigate(`/edit-content/${id}`)}
                        emptyMessage={sectionName}
                    />
                ) : (
                    <PostGridDemo
                        posts={posts}
                        loading={loading}
                        isEditMode
                        onDelete={(id) => setModal({ visible: true, id })}
                        onEdit={(id) => navigate(`/edit-content/${id}`)}
                        emptyMessage={sectionName}
                    />
                )}
            </div>
            <FooterTechMax />
        </>
    );
}
