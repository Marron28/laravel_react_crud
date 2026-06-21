import { useState } from 'react';
import TechMaxButton from './TechMaxButton';

type FormProps = {
    title: string;
    onSubmit: (e: React.FormEvent) => void;
    titleValue: string;
    descriptionValue: string;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onImageChange: (file: File | null) => void;
    existingImage?: string | null;
    loading?: boolean;
    submitLabel?: string;
};

export default function Form({
    title,
    onSubmit,
    titleValue,
    descriptionValue,
    onTitleChange,
    onDescriptionChange,
    onImageChange,
    existingImage,
    loading = false,
    submitLabel = 'Submit',
}: FormProps) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onImageChange(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col justify-self-center my-12 xl:p-12 lg:p-14 md:p-10 xs:w-xs xl:w-3xl w-2xs lg:w-4xl md:w-2xl p-6 bg-olive-50 rounded-lg shadow-lg"
        >
            <h1 className="text-center text-blue-700 font-bold text-3xl mb-12">{title}</h1>
            <label htmlFor="title" className="text-lg font-bold mb-2">
                Title
            </label>
            <input
                type="text"
                id="title"
                value={titleValue}
                onChange={onTitleChange}
                placeholder="Title"
                autoComplete="off"
                className="font-semibold bg-white border border-gray-300 rounded-md mb-3 p-4 focus:ring-blue-700 focus:outline-none focus:ring-1 hover:border-blue-700"
            />
            <label htmlFor="description" className="text-lg font-bold mb-2">
                Description
            </label>
            <textarea
                id="description"
                value={descriptionValue}
                onChange={onDescriptionChange}
                placeholder="Description"
                className="font-semibold bg-white border border-gray-300 rounded-md mb-3 px-4 pt-4 overflow-hidden pb-6 resize-none focus:ring-blue-700 focus:outline-none focus:ring-1 hover:border-blue-700"
            />
            <label className="text-lg font-bold mb-2">Image</label>
            <label htmlFor="image" className="cursor-pointer mb-6">
                {preview ? (
                    <img
                        src={preview}
                        alt="preview"
                        className="py-2 w-full h-56 object-contain rounded-xl border border-gray-300"
                    />
                ) : existingImage ? (
                    <img
                        src={`/storage/${existingImage}`}
                        alt="existing"
                        className="py-2 w-full h-56 object-contain rounded-xl border border-gray-300"
                    />
                ) : (
                    <div className="w-full h-56 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-blue-700 transition">
                        <p className="text-gray-400 text-sm font-semibold">Click to upload image</p>
                        <p className="text-gray-300 text-xs">PNG, JPG, WEBP up to 2MB</p>
                    </div>
                )}
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                />
            </label>
            <TechMaxButton
                type="submit"
                label={loading ? 'Submitting...' : submitLabel}
                className="ml-auto mt-auto"
            />
        </form>
    );
}
