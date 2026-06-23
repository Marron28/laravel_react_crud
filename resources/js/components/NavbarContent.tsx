import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TechMaxButton from './TechMaxButton';

const LOGO_URL = 'https://thepixelcurve.com/html/techmax/img/logo.png';
const LOGO_WHITE_URL = 'https://thepixelcurve.com/html/techmax/img/logo-white.png';

type NavbarContentProps = {
    variant?: 'black' | 'white';
};

export default function NavbarContent({ variant = 'black' }: NavbarContentProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const scrollToElement = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id === 'demo' || id === 'inner-pages' ? 'demo' : id);
        }
    };

    const goToSection = (id: string) => {
        setIsOpen(false);

        if (location.pathname === '/') {
            scrollToElement(id);
            return;
        }

        navigate({ pathname: '/', hash: id });
    };

    useEffect(() => {
        const handleScroll = () => setIsOpen(false);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (location.pathname !== '/') {
            setActiveSection('');
            return;
        }

        const handleScroll = () => {
            const offset = 125;
            const scrollPos = window.scrollY + offset;

            const featuresEl = document.getElementById('features');
            const demoEl = document.getElementById('demo');

            if (featuresEl && scrollPos >= featuresEl.offsetTop) {
                setActiveSection('features');
                return;
            }

            if (demoEl && scrollPos >= demoEl.offsetTop) {
                setActiveSection('demo');
                return;
            }

            setActiveSection('');
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const logo = variant === 'white' ? LOGO_WHITE_URL : LOGO_URL;

    const goHome = () => {
        setIsOpen(false);
        setActiveSection('');

        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 items-center">
                <button onClick={goHome} className="justify-self-start cursor-pointer">
                    <img
                        src={logo}
                        alt="Techmax"
                        className={`h-auto w-[150px] max-w-full ${variant === 'white' ? 'ml-3 lg:ml-4' : ''}`}
                    />
                </button>
                <div className="lg:flex gap-5 justify-self-end lg:text-md font-bold items-center hidden">
                    <button
                        type="button"
                        onClick={goHome}
                        className={`cursor-pointer ${activeSection === '' ? 'text-brand' : ''}`}
                    >
                        Home
                    </button>
                    <button
                        type="button"
                        onClick={() => goToSection('demo')}
                        className={`cursor-pointer ${activeSection === 'demo' ? 'text-brand' : ''}`}
                    >
                        Demo
                    </button>
                    <button
                        type="button"
                        onClick={() => goToSection('features')}
                        className={`cursor-pointer ${activeSection === 'features' ? 'text-brand' : ''}`}
                    >
                        Features
                    </button>
                    <button type="button" onClick={goHome} className="cursor-pointer">
                        Support
                    </button>
                    <TechMaxButton label="Buy Now!" />
                </div>
                <div className="flex justify-self-end lg:hidden">
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <ul
                className={`${isOpen ? 'block' : 'hidden'} absolute left-0 right-0 bg-white items-start lg:hidden py-2 px-6 text-black`}
            >
                <div className="bg-white border-2 border-gray-100 px-6">
                    <button type="button" onClick={goHome} className="block w-full text-left">
                        <li className="text-md font-bold my-6">Home</li>
                    </button>
                    <button
                        type="button"
                        onClick={() => goToSection('demo')}
                        className="block w-full text-left"
                    >
                        <li className="text-md font-bold my-6">Demo</li>
                    </button>
                    <button
                        type="button"
                        onClick={() => goToSection('features')}
                        className="block w-full text-left"
                    >
                        <li className="text-md font-bold my-6">Features</li>
                    </button>
                    <button type="button" onClick={goHome} className="block w-full text-left">
                        <li className="text-md font-bold my-6">Support</li>
                    </button>
                    <li className="my-6">
                        <TechMaxButton label="Buy Now!" />
                    </li>
                </div>
            </ul>
        </>
    );
}
