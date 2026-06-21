import { useState } from 'react';
import Navbar from '../components/Navbar';
import Form from '../components/Form';
import Alert from '../components/Alert';
import NavbarContent from '../components/NavbarContent';
import FooterTechMax from '../section/Footer';

type AddContentProps = {
    sectionName: string;
    formTitle: string;
};

export default function AddContent({ sectionName, formTitle }: AddContentProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [formKey, setFormKey] = useState(0);
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
            setTitle('');
            setDescription('');
            setImage(null);
            setFormKey((prev) => prev + 1);
        } catch {
            showAlert('failed', 'Network error — check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <nav className="bg-white xl:px-50 lg:px-20 lg:py-8 p-8 shadow-md">
                <NavbarContent variant="black" />
            </nav>
            <Alert type={alert.type} message={alert.message} visible={alert.visible} />
            <Form
                key={formKey}
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
