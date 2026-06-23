import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PageSectionProvider } from '../hooks/usePageSections';
import FooterTechMax from '../section/Footer';
import HeroSection from '../section/HeroSection';
import OurFeatures from '../section/OurFeatures';
import UniqueHomePage from '../section/Demo';

export default function Main() {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (!hash) return;

        const scrollToHash = () => {
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        const timer = window.setTimeout(scrollToHash, 150);
        return () => window.clearTimeout(timer);
    }, [location.pathname, location.hash]);

    return (
        <PageSectionProvider>
            <Navbar />
            <HeroSection />
            <UniqueHomePage />
            <OurFeatures />
            <FooterTechMax />
        </PageSectionProvider>
    );
}
