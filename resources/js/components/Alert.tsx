type AlertProps = {
    type: 'success' | 'failed';
    message: string;
    visible: boolean;
};

export default function Alert({ type, message, visible }: AlertProps) {
    if (!visible) return null;

    if (type === 'success') {
        return (
            <div className="fixed top-6 right-6 flex items-center gap-3 bg-neutral-50 border-l-4 border-brand shadow-sm shadow-brand rounded-2xl p-6 min-w-sm z-50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-8 text-brand"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                <div>
                    <p className="font-bold text-brand text-md">Success</p>
                    <p className="text-gray-600 text-xs mt-0.5">{message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-6 right-6 flex items-center gap-3 bg-neutral-50 border-l-4 border-red-700 shadow-sm shadow-red-700 rounded-2xl p-6 min-w-sm z-50">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-8 text-red-700"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
            <div>
                <p className="font-bold text-red-700 text-md">Failed</p>
                <p className="text-gray-600 text-xs mt-0.5">{message}</p>
            </div>
        </div>
    );
}
