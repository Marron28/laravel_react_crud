import Navbar from '../components/Navbar';
import { PageSectionProvider } from '../hooks/usePageSections';
import FooterTechMax from '../section/Footer';
import HeroSection from '../section/HeroSection';
import OurFeatures from '../section/OurFeatures';
import UniqueHomePage from '../section/Demo';

export default function Main() {
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
