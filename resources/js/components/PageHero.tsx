import { ReactNode } from 'react';
import Navbar from './Navbar';
import NavbarContent from './NavbarContent';
import { useTypewriter } from './Usetypewriter';
import {
    HERO_BG_URL,
    HERO_TYPEWRITER_OPTIONS,
    HERO_TYPEWRITER_TEXTS,
} from '../constants/heroTypewriter';

function HeroImagePlaceholder() {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
            <div className="flex flex-col items-center gap-3 text-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-16 opacity-50"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>
                <p className="text-sm font-semibold tracking-wide">No image uploaded</p>
            </div>
        </div>
    );
}

type PageHeroProps = {
    title: ReactNode;
    image?: string | null;
    imageUrl?: string | null;
    usePlaceholderWhenNoImage?: boolean;
    id?: string;
};

export default function PageHero({
    title,
    image,
    imageUrl,
    usePlaceholderWhenNoImage = false,
    id,
}: PageHeroProps) {
    const typewriterText = useTypewriter(HERO_TYPEWRITER_TEXTS, HERO_TYPEWRITER_OPTIONS);

    const heroImageUrl = imageUrl ?? (image ? `/storage/${image}` : null);
    const hasCustomImage = Boolean(heroImageUrl);
    const showPlaceholder = usePlaceholderWhenNoImage && !hasCustomImage;
    const showDefaultBackground = !hasCustomImage && !showPlaceholder;

    return (
        <>
            <Navbar />
            <div
                id={id}
                className="relative flex min-h-[550px] flex-col lg:min-h-[600px]"
            >
                {hasCustomImage && (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${heroImageUrl})`,
                        }}
                    />
                )}
                {showPlaceholder && <HeroImagePlaceholder />}
                {showDefaultBackground && (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${HERO_BG_URL})`,
                        }}
                    />
                )}

                <div className="relative z-10 flex min-h-[550px] flex-1 flex-col lg:min-h-[600px]">
                    <nav className="nav-shell text-white">
                        <NavbarContent variant="white" />
                    </nav>

                    <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-8 text-center lg:px-16 lg:pb-28">
                        <p className="mb-3 font-['Nunito_Sans',sans-serif] text-[17px] font-semibold tracking-wide text-brand">
                            {typewriterText}
                            <span className="ml-0.5">|</span>
                        </p>
                        <h1 className="font-[Manrope,sans-serif] text-[1.5rem] font-bold leading-[35px] text-white md:text-[2.15rem] md:leading-[52px] lg:text-[2.7rem] lg:leading-[65px]">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
}
