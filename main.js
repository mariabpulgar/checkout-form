const formTitles = document.querySelectorAll('.form-field-title');
const formBodies = document.querySelectorAll('.form-body');

formTitles.forEach(title => {
    const img = title.querySelector('img');
    if (img) img.style.display = 'none';
});

formTitles.forEach((title, index) => {
    title.addEventListener('click', () => {
        const isActive = formBodies[index].classList.contains('active');

        formBodies.forEach((body, i) => {
            body.classList.remove('active');
            body.classList.add('hidden');
            const img = formTitles[i].querySelector('img');
            if (img) img.style.display = 'none'; 
        });

        if (!isActive) {
            formBodies[index].classList.add('active');
            formBodies[index].classList.remove('hidden');
            const img = title.querySelector('img');
            if (img) img.style.display = 'block'; 
        }
    });
});
