import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageNavbar from '../components/PageNavbar';
import Form from '../components/Form';
import Alert from '../components/Alert';
import FooterTechMax from '../section/Footer';

type AddContentProps = {
    sectionName: string;
    formTitle: string;
};

export default function AddContent({ sectionName, formTitle }: AddContentProps) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
        type: 'success' | 'failed';
        message: string;
        visible: boolean;
    }>({ type: 'success', message: '', visible: false });

    const showAlert = (type: 'success' | 'failed', message: string) => {
        setAlert({ type, message, visible: true });
        setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            showAlert('failed', 'All fields are required.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('section_name', sectionName);
            formData.append('title', title);
            formData.append('description', description);
            if (image) formData.append('image', image);

            const response = await fetch('/api/posts', {
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

            showAlert('success', 'Content added successfully!');

            const hash =
                sectionName === 'Unique Home Page'
                    ? 'demo'
                    : sectionName === 'Stunning Inner Pages'
                      ? 'inner-pages'
                      : sectionName === 'Our Features'
                        ? 'features'
                        : '';

            navigate(hash ? { pathname: '/', hash } : '/', { replace: true });
        } catch {
            showAlert('failed', 'Network error — check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageNavbar />
            <Alert type={alert.type} message={alert.message} visible={alert.visible} />
            <Form
                title={formTitle}
                onSubmit={handleSubmit}
                titleValue={title}
                descriptionValue={description}
                onTitleChange={(e) => setTitle(e.target.value)}
                onDescriptionChange={(e) => setDescription(e.target.value)}
                onImageChange={(file) => setImage(file)}
                loading={loading}
            />
            <FooterTechMax />
        </>
    );
}
