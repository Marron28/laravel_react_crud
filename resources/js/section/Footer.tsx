import logo from '../assets/pixelcurve.svg';
import TechMaxButton from '../components/TechMaxButton';

export default function FooterTechMax() {
    return (
        <div className="pt-24 pb-12 bg-black text-center">
            <h1 className="mb-6 xl:px-80 lg:px-24 md:px-16 px-6 text-white xl:text-5xl md:text-4xl text-2xl font-semibold">
                Purchase the Techmax Template now and make everything easier
            </h1>
            <TechMaxButton label="Purchase Now!" className="mb-12" />
            <img src={logo} alt="techmaxlogo" className="justify-self-center mx-auto mb-2" />
            <span className="text-sm text-white">© 2022, Crafted by Pixelcurve.</span>
        </div>
    );
}
