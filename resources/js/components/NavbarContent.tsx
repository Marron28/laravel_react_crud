import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TechMaxButton from './TechMaxButton';
import logoBlack from '../assets/logoBlack.svg';
import logoWhite from '../assets/logowhite.svg';

type NavbarContentProps = {
    variant?: 'black' | 'white';
};

export default function NavbarContent({ variant = 'black' }: NavbarContentProps) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => setIsOpen(false);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection('');
                return;
            }

            for (const section of ['demo', 'features']) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 400 && rect.bottom >= 0) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logo = variant === 'white' ? logoWhite : logoBlack;

    const goHome = () => {
        if (window.location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 items-center">
                <div className="justify-self-start">
                    <img src={logo} alt="techmaxlogo" />
                </div>
                <div className="lg:flex gap-5 justify-self-end lg:text-md font-bold items-center hidden">
                    <button
                        onClick={goHome}
                        className={`cursor-pointer ${activeSection === '' ? 'text-blue-700' : ''}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollToSection('demo')}
                        className={`cursor-pointer ${activeSection === 'demo' ? 'text-blue-700' : ''}`}
                    >
                        Demo
                    </button>
                    <button
                        onClick={() => scrollToSection('features')}
                        className={`cursor-pointer ${activeSection === 'features' ? 'text-blue-700' : ''}`}
                    >
                        Features
                    </button>
                    <a href="/">Support</a>
                    <TechMaxButton label="Buy Now!" />
                </div>
                <div className="flex justify-self-end lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
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
                    <button onClick={goHome} className="block w-full text-left">
                        <li className="text-md font-bold my-6">Home</li>
                    </button>
                    <button onClick={() => scrollToSection('demo')} className="block w-full text-left">
                        <li className="text-md font-bold my-6">Demo</li>
                    </button>
                    <button onClick={() => scrollToSection('features')} className="block w-full text-left">
                        <li className="text-md font-bold my-6">Features</li>
                    </button>
                    <a href="/">
                        <li className="text-md font-bold my-6">Support</li>
                    </a>
                    <li className="my-6">
                        <TechMaxButton label="Buy Now!" />
                    </li>
                </div>
            </ul>
        </>
    );
}
