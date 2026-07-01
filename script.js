document.addEventListener('DOMContentLoaded', () => {
    const countdownView = document.getElementById('countdown-view');
    const celebrationView = document.getElementById('celebration-view');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    // Setting the timer strictly for her birthday countdown!
    const targetDate = new Date("July 2, 2026 00:00:00").getTime();
    let isCelebrationTime = false;

    function updateCountdown() {
        if (isCelebrationTime) return;

        const now = new Date().getTime();
        let difference = targetDate - now;

        if (difference <= 0) {
            isCelebrationTime = true;
            showCelebration();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysSpan) daysSpan.textContent = days.toString().padStart(2, '0');
        hoursSpan.textContent = hours.toString().padStart(2, '0');
        minutesSpan.textContent = minutes.toString().padStart(2, '0');
        secondsSpan.textContent = seconds.toString().padStart(2, '0');
    }

    function typeWriterEffect() {
        const lines = [
            "Some feelings are hard to put into words...",
            "",
            "But today, I just want to say thank you for being exactly the person you are.",
            "",
            "Your strength, your smile, and even your little stubbornness make you truly special.",
            "",
            "I hope this birthday brings you happiness, peace, and beautiful memories.",
            "",
            "Keep smiling, keep shining, and never stop being you.",
            "",
            "Happy Birthday once again. \u2764\ufe0f"
        ];
        const fullText = lines.join("\n");
        const element = document.querySelector('.typewriter');
        element.innerHTML = '<span class="cursor">|</span>';
        let i = 0;

        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (i < fullText.length) {
                    const typed = fullText.substring(0, i + 1)
                        .replace(/\n\n/g, '<br><br>')
                        .replace(/\n/g, '<br>');
                    element.innerHTML = typed + '<span class="cursor">|</span>';
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 45); // fast but readable speed
        }, 800);
    }

    function showCelebration() {
        // Step 1: Fade OUT the countdown
        countdownView.classList.add('hidden');

        // Step 2: After fade-out finishes, fade IN the celebration
        setTimeout(() => {
            celebrationView.classList.remove('hidden');

            // Trigger confetti and typewriter after the celebration is visible
            setTimeout(() => {
                triggerInitialConfetti();
                typeWriterEffect();
            }, 600);

        }, 1400); // matches the 1.4s CSS transition
    }

    // Triple-click / triple-tap to skip timer
    let clickCount = 0;
    let clickResetTimer = null;

    document.addEventListener('click', () => {
        if (isCelebrationTime) return;

        clickCount++;

        if (clickCount === 1) {
            clickResetTimer = setTimeout(() => { clickCount = 0; }, 800);
        }

        if (clickCount >= 3) {
            clearTimeout(clickResetTimer);
            clickCount = 0;
            isCelebrationTime = true;
            showCelebration();
        }
    });

    function triggerInitialConfetti() {
        var duration = 5 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff8da1', '#ff4d6d', '#ffd6b3']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff8da1', '#ff4d6d', '#ffd6b3']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    if (new Date().getTime() >= targetDate) {
        isCelebrationTime = true;
        countdownView.classList.add('hidden');
        celebrationView.classList.remove('hidden');
        triggerInitialConfetti();
        typeWriterEffect();
    } else {
        celebrationView.classList.add('hidden');
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});
