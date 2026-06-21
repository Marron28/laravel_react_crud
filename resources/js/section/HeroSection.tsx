import NavbarContent from '../components/NavbarContent';
import { useTypewriter } from '../components/Usetypewriter';

const texts: string[] = [
    'Modern trendy & Unique Design',
    'Built With Sass.',
    'Built on Bootstrap',
    'W3 Valid.',
    'Easily Customizable.',
    'Fully Responsive Layout.',
    'Swiper Slider',
    'Developer Friendly',
    'Well Documented.',
    'Magnific Popup',
];

export default function HeroSection() {
    const text = useTypewriter(texts, {
        typingSpeed: 200,
        deletingSpeed: 60,
        pauseAfterType: 1200,
        pauseAfterDelete: 500,
    });

    return (
        <div
            className="h-150 bg-center bg-cover bg-black/70 bg-blend-multiply flex flex-col"
            style={{
                backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80)',
            }}
            id="main"
        >
            <nav className="xl:px-50 lg:px-20 lg:py-8 p-8 text-white">
                <NavbarContent variant="white" />
            </nav>
            <div className="text-center m-auto">
                <span className="text-sm lg:text-md font-bold tracking-wider text-blue-700">
                    {text}
                </span>
                <span className="font-light tracking-wider text-sm md:text-lg text-white">|</span>
                <h1 className="lg:text-5xl text-3xl text-white font-bold text-center">
                    Techmax - Technology Business Consultant
                    <br />
                    HTML5 Template
                </h1>
            </div>
        </div>
    );
}
