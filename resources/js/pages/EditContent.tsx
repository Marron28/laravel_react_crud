import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Form from '../components/Form';
import Alert from '../components/Alert';
import DeleteModal from '../components/DeleteModal';
import FooterTechMax from '../section/Footer';

function getSectionHash(sectionName: string): string {
    if (sectionName === 'Unique Home Page') return 'demo';
    if (sectionName === 'Stunning Inner Pages') return 'inner-pages';
    if (sectionName === 'Our Features') return 'features';
    return '';
}

export default function EditContent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formTitle, setFormTitle] = useState('Edit Content');
    const [formKey, setFormKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [alert, setAlert] = useState<{
        type: 'success' | 'failed';
        message: string;
        visible: boolean;
    }>({ type: 'success', message: '', visible: false });

    const showAlert = (type: 'success' | 'failed', message: string) => {
        setAlert({ type, message, visible: true });
        setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
    };

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setExistingImage(data.image);
                setSectionName(data.section_name ?? '');
                setFormTitle(`Editing ${data.title}`);
            })
            .finally(() => setDataLoading(false));
    }, [id]);

    useEffect(() => {
        if (!image) {
            setImagePreview(null);
            return;
        }

        const previewUrl = URL.createObjectURL(image);
        setImagePreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [image]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            showAlert('failed', 'All fields are required.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('title', title);
            formData.append('description', description);
            if (image) formData.append('image', image);

            const response = await fetch(`/api/posts/${id}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    const firstError = Object.values(data.errors)[0] as string[];
                    showAlert('failed', firstError[0]);
                    return;
                }
                showAlert('failed', data.message ?? 'Something went wrong.');
                return;
            }

            showAlert('success', 'Content updated successfully!');
            setFormKey((prev) => prev + 1);
            setExistingImage(data.image);
            setImage(null);
        } catch {
            showAlert('failed', 'Network error — check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });

        if (!response.ok) {
            showAlert('failed', 'Something went wrong.');
            setDeleteModalVisible(false);
            return;
        }

        const hash = getSectionHash(sectionName);
        navigate(hash ? { pathname: '/', hash } : '/', { replace: true });
    };

    if (dataLoading) {
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
            <PageHero
                title={title}
                image={imagePreview ? null : existingImage}
                imageUrl={imagePreview}
                usePlaceholderWhenNoImage
            />
            <DeleteModal
                visible={deleteModalVisible}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteModalVisible(false)}
            />
            <Alert type={alert.type} message={alert.message} visible={alert.visible} />
            <Form
                key={formKey}
                title={formTitle}
                showPageTitle={false}
                onSubmit={handleSubmit}
                titleValue={title}
                descriptionValue={description}
                onTitleChange={(e) => setTitle(e.target.value)}
                onDescriptionChange={(e) => setDescription(e.target.value)}
                onImageChange={(file) => setImage(file)}
                existingImage={existingImage}
                submitLabel="Update"
                loading={loading}
                onDelete={() => setDeleteModalVisible(true)}
                onBack={() => navigate(`/view-content/${id}`)}
            />
            <FooterTechMax />
        </>
    );
}
