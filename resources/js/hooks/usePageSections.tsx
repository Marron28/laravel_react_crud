import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { PageSection } from '../types/sections';

type PageSectionContextValue = {
    loading: boolean;
    getSection: (name: string) => PageSection | null;
};

const PageSectionContext = createContext<PageSectionContextValue | null>(null);

export function PageSectionProvider({ children }: { children: ReactNode }) {
    const [sections, setSections] = useState<PageSection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/page-sections')
            .then((res) => res.json())
            .then((data: PageSection[]) => {
                setSections(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const getSection = (name: string) =>
        sections.find((section) => section.name === name) ?? null;

    return (
        <PageSectionContext.Provider value={{ loading, getSection }}>
            {children}
        </PageSectionContext.Provider>
    );
}

export function usePageSection(sectionName: string) {
    const context = useContext(PageSectionContext);

    if (!context) {
        throw new Error('usePageSection must be used within PageSectionProvider');
    }

    const section = context.getSection(sectionName);
    const isVisible = section?.setting?.is_visible !== false;

    return {
        section,
        loading: context.loading,
        isVisible,
    };
}
