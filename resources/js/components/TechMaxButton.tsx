import { ButtonHTMLAttributes } from 'react';

type TechMaxButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string;
    icon?: React.ReactNode;
    variant?:
        | 'default'
        | 'defaultStylesred'
        | 'iconCircle'
        | 'iconCircleStylesRed'
        | 'simple';
};

export default function TechMaxButton({
    label,
    className = '',
    icon,
    variant = 'default',
    ...props
}: TechMaxButtonProps) {
    const defaultStyles =
        'bg-brand hover:bg-white hover:text-brand text-white text-center text-sm font-bold py-3 px-6 rounded-md shadow-brand-dark shadow-sm transition-all duration-200 hover:shadow-lg cursor-pointer';

    const defaultStylesred =
        'bg-red-600 hover:bg-white hover:text-red-600 text-white text-center text-sm font-bold py-3 px-6 rounded-md shadow-red-600 shadow-sm transition-all duration-200 hover:shadow-lg cursor-pointer';

    const iconCircleStyles =
        'bg-brand hover:bg-white hover:text-brand text-white tex-center text-sm font-bold p-3 rounded-full shadow-brand-dark shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer';

    const iconCircleStylesRed =
        'bg-red-600 hover:bg-white hover:text-red-600 text-white tex-center text-sm font-bold p-3 rounded-full shadow-red-800 shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer';

    const simpleStyles =
        'bg-brand hover:bg-white hover:text-brand text-white text-center text-sm font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer';

    const styles =
        variant === 'iconCircle'
            ? iconCircleStyles
            : variant === 'iconCircleStylesRed'
              ? iconCircleStylesRed
              : variant === 'defaultStylesred'
                ? defaultStylesred
                : variant === 'simple'
                  ? simpleStyles
                  : defaultStyles;

    return (
        <button type="button" className={`${styles} ${className}`} {...props}>
            <span className="flex items-center gap-1">
                {icon}
                {label}
            </span>
        </button>
    );
}
