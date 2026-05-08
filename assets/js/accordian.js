document.querySelectorAll('.experience-header').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const item = btn.closest('.experience-item');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.experience-item').forEach(function(el) { 
            el.classList.remove('open');
            el.querySelector('.experience-header').setAttribute('aria-expanded', 'false');
        });

        // Open clicked if it wasn't already open
        if (!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});