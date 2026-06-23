import PageHero from '../components/PageHero';

export default function HeroSection() {
    return (
        <PageHero
            id="main"
            title={
                <>
                    <span className="block whitespace-normal lg:whitespace-nowrap">
                        Techmax - Technology Business Consultant
                    </span>
                    <span className="block">HTML5 Template</span>
                </>
            }
        />
    );
}
