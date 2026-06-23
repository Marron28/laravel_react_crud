import { useState, useEffect } from 'react';
import NavbarContent from './NavbarContent';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`nav-shell fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-500 ease-in-out ${isSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
        >
            <NavbarContent />
        </nav>
    );
}
