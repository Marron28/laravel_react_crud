import TechMaxButton from '../components/TechMaxButton';

const PIXELCURVE_LOGO_URL = 'https://thepixelcurve.com/html/techmax/img/pixelcurve.png';

export default function FooterTechMax() {
    return (
        <footer className="bg-[#1f1f1f] px-6 pt-20 pb-10 text-center" id="support">
            <h1 className="mx-auto mb-10 max-w-4xl text-2xl font-semibold leading-snug text-white md:text-3xl lg:text-4xl">
                Purchase the Techmax Template now and make everything easier
            </h1>
            <TechMaxButton label="Purchase Now!" variant="simple" className="mb-14" />
            <img
                src={PIXELCURVE_LOGO_URL}
                alt="Pixelcurve"
                className="mx-auto mb-6 h-16 w-auto"
            />
            <p className="text-sm text-white/90">© 2022, Crafted by Pixelcurve.</p>
        </footer>
    );
}
