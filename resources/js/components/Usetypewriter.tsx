import { useState, useEffect, useRef } from 'react';

interface TypewriterOptions {
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseAfterType?: number;
    pauseAfterDelete?: number;
}

interface TypewriterState {
    textIndex: number;
    charIndex: number;
    isDeleting: boolean;
}

export function useTypewriter(
    texts: string[],
    {
        typingSpeed = 200,
        deletingSpeed = 60,
        pauseAfterType = 1200,
        pauseAfterDelete = 500,
    }: TypewriterOptions = {},
): string {
    const [displayed, setDisplayed] = useState<string>('');
    const state = useRef<TypewriterState>({
        textIndex: 0,
        charIndex: 0,
        isDeleting: false,
    });

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        function tick() {
            const { textIndex, charIndex, isDeleting } = state.current;
            const current = texts[textIndex];

            if (!isDeleting) {
                setDisplayed(current.substring(0, charIndex + 1));
                state.current.charIndex++;

                if (state.current.charIndex === current.length) {
                    timer = setTimeout(() => {
                        state.current.isDeleting = true;
                        tick();
                    }, pauseAfterType);
                    return;
                }
            } else {
                setDisplayed(current.substring(0, charIndex - 1));
                state.current.charIndex--;

                if (state.current.charIndex === 0) {
                    state.current.isDeleting = false;
                    state.current.textIndex = (textIndex + 1) % texts.length;
                    timer = setTimeout(tick, pauseAfterDelete);
                    return;
                }
            }

            timer = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
        }

        timer = setTimeout(tick, typingSpeed);
        return () => clearTimeout(timer);
    }, [texts, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

    return displayed;
}
