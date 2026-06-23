type ImagePlaceholderProps = {
    variant?: 'card' | 'icon';
    className?: string;
};

export default function ImagePlaceholder({
    variant = 'card',
    className = '',
}: ImagePlaceholderProps) {
    const isIcon = variant === 'icon';

    return (
        <div
            className={`flex flex-col items-center justify-center text-gray-400 ${
                isIcon ? 'h-16 w-16 rounded-md bg-gray-100' : 'h-full w-full bg-gray-100'
            } ${className}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={isIcon ? 'size-8 opacity-60' : 'size-12 opacity-50'}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
            </svg>
            {!isIcon && (
                <p className="mt-2 text-xs font-semibold tracking-wide">No image uploaded</p>
            )}
        </div>
    );
}
