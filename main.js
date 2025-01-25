const formTitles = document.querySelectorAll('.form-field-title');
const formBodies = document.querySelectorAll('.form-body');
const deliveryRadio = document.getElementById('home');
const pickupRadio = document.getElementById('store');
const deliveryCard = document.querySelector('.delivery-card');
const pickupCard = document.querySelector('.pickup-card');

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

function handleDeliverySelection() {
    if (deliveryRadio.checked) {
        deliveryCard.classList.remove('hidden');
        deliveryCard.classList.add('active');
        pickupCard.classList.remove('active');
        pickupCard.classList.add('hidden');
    } else if (pickupRadio.checked) {
        pickupCard.classList.remove('hidden');
        pickupCard.classList.add('active');
        deliveryCard.classList.remove('active');
        deliveryCard.classList.add('hidden');
    }
}

deliveryRadio.addEventListener('change', handleDeliverySelection);
pickupRadio.addEventListener('change', handleDeliverySelection);

handleDeliverySelection();