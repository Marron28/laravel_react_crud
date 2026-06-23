import NavbarContent from '../components/NavbarContent';
import { useTypewriter } from '../components/Usetypewriter';

const texts: string[] = [
    'Modern Trendy & Unique Design',
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

const HERO_BG_URL = 'https://thepixelcurve.com/html/techmax/img/slider-img.jpg';

export default function HeroSection() {
    const text = useTypewriter(texts, {
        typingSpeed: 200,
        deletingSpeed: 60,
        pauseAfterType: 1200,
        pauseAfterDelete: 500,
    });

    return (
        <div
            className="relative flex min-h-[550px] flex-col bg-cover bg-center lg:min-h-[600px]"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${HERO_BG_URL})`,
            }}
            id="main"
        >
            <nav className="nav-shell text-white">
                <NavbarContent variant="white" />
            </nav>
            <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-8 text-center lg:px-16 lg:pb-28">
                <p className="mb-3 font-['Nunito_Sans',sans-serif] text-[17px] font-semibold tracking-wide text-brand">
                    {text}
                    <span className="ml-0.5">|</span>
                </p>
                <h1 className="font-['Manrope',sans-serif] text-[1.5rem] font-bold leading-[35px] text-white md:text-[2.15rem] md:leading-[52px] lg:text-[2.7rem] lg:leading-[65px]">
                    <span className="block whitespace-normal lg:whitespace-nowrap">
                        Techmax - Technology Business Consultant
                    </span>
                    <span className="block">HTML5 Template</span>
                </h1>
            </div>
        </div>
    );
}
