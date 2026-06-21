import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import AddContent from './pages/AddContent';
import AddSectionTitle from './pages/AddSectionTitle';
import Edit from './pages/Edit';
import EditContent from './pages/EditContent';

const container = document.getElementById('app')!;

createRoot(container).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route
                path="/add-unique-home-page"
                element={
                    <AddContent
                        sectionName="Unique Home Page"
                        formTitle="Add Unique Home Page"
                    />
                }
            />
            <Route
                path="/add-stunning-inner-pages"
                element={
                    <AddContent
                        sectionName="Stunning Inner Pages"
                        formTitle="Add Stunning Inner Pages"
                    />
                }
            />
            <Route
                path="/add-features"
                element={
                    <AddContent
                        sectionName="Our Features"
                        formTitle="Add Our Features"
                    />
                }
            />
            <Route path="/edit/:section" element={<Edit />} />
            <Route path="/edit-content/:id" element={<EditContent />} />
            <Route path="/add-section-title" element={<AddSectionTitle />} />
        </Routes>
    </BrowserRouter>,
);
