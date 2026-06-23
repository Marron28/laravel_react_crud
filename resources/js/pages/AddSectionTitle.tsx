import { useState, useEffect } from 'react';
import PageNavbar from '../components/PageNavbar';
import TechMaxButton from '../components/TechMaxButton';
import Alert from '../components/Alert';
import type { PageSection } from '../types/sections';

export default function AddSectionTitle() {
    const [name, setName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState<PageSection[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editSubtitle, setEditSubtitle] = useState('');
    const [editVisible, setEditVisible] = useState(true);
    const [alert, setAlert] = useState<{
        type: 'success' | 'failed';
        message: string;
        visible: boolean;
    }>({ type: 'success', message: '', visible: false });

    const showAlert = (type: 'success' | 'failed', message: string) => {
        setAlert({ type, message, visible: true });
        setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
    };

    const fetchSections = async () => {
        const response = await fetch('/api/page-sections');
        const data = await response.json();
        setSections(data);
    };

    useEffect(() => {
        fetchSections();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            showAlert('failed', 'Section title is required.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/page-sections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    subtitle: subtitle.trim() || null,
                }),
            });

            if (!response.ok) {
                showAlert('failed', 'Something went wrong.');
                return;
            }

            showAlert('success', 'Section added successfully!');
            setName('');
            setSubtitle('');
            fetchSections();
        } catch {
            showAlert('failed', 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const startEdit = async (id: number) => {
        const response = await fetch(`/api/page-sections/${id}`);

        if (!response.ok) {
            showAlert('failed', 'Failed to load section.');
            return;
        }

        const section: PageSection = await response.json();
        setEditingId(section.id);
        setEditName(section.name);
        setEditSubtitle(section.setting?.subtitle ?? '');
        setEditVisible(section.setting?.is_visible ?? true);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditSubtitle('');
        setEditVisible(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingId || !editName.trim()) {
            showAlert('failed', 'Section title is required.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/page-sections/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: editName,
                    subtitle: editSubtitle.trim() || null,
                    is_visible: editVisible,
                }),
            });

            if (!response.ok) {
                showAlert('failed', 'Failed to update section.');
                return;
            }

            showAlert('success', 'Section updated successfully!');
            cancelEdit();
            fetchSections();
        } catch {
            showAlert('failed', 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        const response = await fetch(`/api/page-sections/${id}`, { method: 'DELETE' });

        if (!response.ok) {
            showAlert('failed', 'Failed to delete.');
            return;
        }

        if (editingId === id) {
            cancelEdit();
        }

        showAlert('success', 'Section deleted successfully!');
        fetchSections();
    };

    return (
        <>
            <PageNavbar />
            <Alert type={alert.type} message={alert.message} visible={alert.visible} />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-self-center m-12 p-12 bg-olive-50 rounded-lg shadow-lg w-3xl"
            >
                <h1 className="text-center text-brand font-bold text-3xl mb-12">
                    Add Section Title
                </h1>
                <label htmlFor="section_title" className="text-lg font-bold mb-2">
                    Section Title
                </label>
                <input
                    type="text"
                    id="section_title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Section Title"
                    className="font-semibold bg-white border border-gray-300 rounded-md mb-3 p-4 focus:ring-brand focus:outline-none focus:ring-1 hover:border-brand"
                    autoComplete="off"
                />
                <label htmlFor="section_subtitle" className="text-lg font-bold mb-2">
                    Subtitle
                </label>
                <input
                    type="text"
                    id="section_subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Optional subtitle"
                    className="font-semibold bg-white border border-gray-300 rounded-md mb-3 p-4 focus:ring-brand focus:outline-none focus:ring-1 hover:border-brand"
                    autoComplete="off"
                />
                <TechMaxButton
                    type="submit"
                    label={loading ? 'Submitting...' : 'Submit'}
                    className="w-28 ml-auto mt-auto"
                />
            </form>

            {editingId !== null && (
                <form
                    onSubmit={handleUpdate}
                    className="flex flex-col justify-self-center mx-12 mb-12 p-12 bg-white rounded-lg shadow-lg w-3xl border border-brand"
                >
                    <h2 className="text-center text-brand font-bold text-2xl mb-8">
                        Edit Section
                    </h2>
                    <label htmlFor="edit_section_title" className="text-lg font-bold mb-2">
                        Section Title
                    </label>
                    <input
                        type="text"
                        id="edit_section_title"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="font-semibold bg-white border border-gray-300 rounded-md mb-3 p-4 focus:ring-brand focus:outline-none focus:ring-1 hover:border-brand"
                        autoComplete="off"
                    />
                    <label htmlFor="edit_section_subtitle" className="text-lg font-bold mb-2">
                        Subtitle
                    </label>
                    <input
                        type="text"
                        id="edit_section_subtitle"
                        value={editSubtitle}
                        onChange={(e) => setEditSubtitle(e.target.value)}
                        className="font-semibold bg-white border border-gray-300 rounded-md mb-3 p-4 focus:ring-brand focus:outline-none focus:ring-1 hover:border-brand"
                        autoComplete="off"
                    />
                    <label className="flex items-center gap-2 mb-6 text-lg font-bold">
                        <input
                            type="checkbox"
                            checked={editVisible}
                            onChange={(e) => setEditVisible(e.target.checked)}
                            className="h-4 w-4"
                        />
                        Visible on site
                    </label>
                    <div className="flex gap-3 ml-auto">
                        <TechMaxButton
                            type="button"
                            label="Cancel"
                            onClick={cancelEdit}
                            className="w-28 bg-gray-500 hover:bg-gray-600"
                        />
                        <TechMaxButton
                            type="submit"
                            label={loading ? 'Saving...' : 'Save'}
                            className="w-28"
                        />
                    </div>
                </form>
            )}

            <div className="grid lg:grid-cols-3 gap-4 px-72 mb-12">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="border rounded-xl p-5 bg-white flex flex-col gap-3"
                    >
                        <div>
                            <h1 className="font-bold">{section.name}</h1>
                            {section.setting?.subtitle && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {section.setting.subtitle}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                {section.setting?.is_visible === false ? 'Hidden' : 'Visible'}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => startEdit(section.id)}
                                className="text-brand font-bold text-sm cursor-pointer"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(section.id)}
                                className="text-red-600 font-bold text-sm cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
