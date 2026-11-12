document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }
    const formatSelect = document.getElementById('calcFormat');
    const lessonsInput = document.getElementById('calcLessonsInput');
    const rawPriceEl = document.getElementById('rawPrice');
    const discountBadgeEl = document.getElementById('discountBadge');
    const totalPriceEl = document.getElementById('totalPrice');

    if (formatSelect && lessonsInput) {
        function calculateLiveTotal() {
            const basePrice = parseInt(formatSelect.value);
            let lessonsCount = parseInt(lessonsInput.value);

            if (isNaN(lessonsCount) || lessonsCount < 0) {
                lessonsCount = 0;
            }
            const rawPrice = basePrice * lessonsCount;
            let discountPercent = 0;
            if (lessonsCount >= 16) {
                discountPercent = 15;
            } else if (lessonsCount >= 8) {
                discountPercent = 10;
            }

            const discountAmount = rawPrice * (discountPercent / 100);
            const finalPrice = rawPrice - discountAmount;

            if (discountPercent > 0) {
                rawPriceEl.textContent = `${rawPrice.toLocaleString('ru-RU')} ₽`;
                rawPriceEl.style.visibility = 'visible';
                discountBadgeEl.textContent = `-${discountPercent}%`;
            } else {
                rawPriceEl.style.visibility = 'hidden';
                discountBadgeEl.textContent = '0%';
            }

            totalPriceEl.textContent = `${finalPrice.toLocaleString('ru-RU')} ₽`;
        }

        formatSelect.addEventListener('change', calculateLiveTotal);
        lessonsInput.addEventListener('input', calculateLiveTotal);

        calculateLiveTotal();
    }
});
