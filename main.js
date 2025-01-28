// Selección de elementos necesarios
const formTitles = document.querySelectorAll('.form-field-title');
const formBodies = document.querySelectorAll('.form-body');
const editButtons = document.querySelectorAll('.form-field-title img'); 
const stepCircles = document.querySelectorAll('.step-circle'); 
const lines = document.querySelectorAll('.line'); 
const btnEnvio = document.getElementById('btn-envio');
const btnPago = document.getElementById('btn-pago');
const btnFinalizar = document.getElementById('btn-finalizar');
const deliveryRadio = document.getElementById('home');
const pickupRadio = document.getElementById('store');
const deliveryCard = document.querySelector('.delivery-card');
const pickupCard = document.querySelector('.pickup-card');
const radioCredito = document.getElementById('credito');
const radioDebito = document.getElementById('debito');
const tarjetaCredito = document.querySelector('.tarjeta-credito');
const tarjetaDebito = document.querySelector('.tarjeta-debito');

function toggleAccordion(currentIndex, nextIndex) {
    formBodies[currentIndex].classList.add('hidden');
    formBodies[currentIndex].classList.remove('active');
    editButtons[currentIndex].style.display = 'block'; 
    stepCircles[currentIndex].classList.remove('colorcirculo'); 

    stepCircles.forEach((circle, index) => {
        if (index <= currentIndex) {
            circle.classList.add('colorcirculo'); 
        } else {
            circle.classList.remove('colorcirculo'); 
        }
    });

    if (nextIndex !== null) {
        formBodies[nextIndex].classList.remove('hidden');
        formBodies[nextIndex].classList.add('active');
        editButtons[nextIndex].style.display = 'none'; 
        stepCircles[nextIndex].classList.add('colorcirculo'); 

        if (lines[nextIndex - 1]) {
            lines[nextIndex - 1].classList.add('active');
        }
    }
}

stepCircles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        formBodies.forEach((body, i) => {
            body.classList.add('hidden');
            body.classList.remove('active');
            editButtons[i].style.display = 'block'; 
            stepCircles[i].classList.remove('colorcirculo'); 
            if (lines[i]) {
                lines[i].classList.remove('active'); 
            }
        });

        formBodies[index].classList.remove('hidden');
        formBodies[index].classList.add('active');
        editButtons[index].style.display = 'none'; 
        stepCircles[index].classList.add('colorcirculo'); 

        for (let i = 0; i < index; i++) {
            stepCircles[i].classList.add('colorcirculo');
            if (lines[i]) {
                lines[i].classList.add('active');
            }
        }
    });
});



function handleDeliverySelection() {
    if (deliveryRadio.checked) {
        deliveryCard.classList.remove('hidden');
        deliveryCard.classList.add('active');
        pickupCard.classList.add('hidden');
        pickupCard.classList.remove('active');
    } else if (pickupRadio.checked) {
        pickupCard.classList.remove('hidden');
        pickupCard.classList.add('active');
        deliveryCard.classList.add('hidden');
        deliveryCard.classList.remove('active');
    }
}

formTitles.forEach((title, index) => {
    title.addEventListener('click', () => {
        const isActive = formBodies[index].classList.contains('active');
        formBodies.forEach((body, i) => {
            body.classList.add('hidden');
            body.classList.remove('active');
            editButtons[i].style.display = 'block'; 
            stepCircles[i].classList.remove('colorcirculo'); 
            if (lines[i]) {
                lines[i].classList.remove('active'); 
            }
        });

        if (!isActive) {
            formBodies[index].classList.remove('hidden');
            formBodies[index].classList.add('active');
            editButtons[index].style.display = 'none'; 
            stepCircles[index].classList.add('colorcirculo'); 
            if (index > 0 && lines[index - 1]) {
                lines[index - 1].classList.add('active'); 
            }
        }
    });
});

btnEnvio.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAccordion(0, 1); 
});

btnPago.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAccordion(1, 2); 
});

btnFinalizar.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAccordion(2, null); 
});
deliveryRadio.addEventListener('change', handleDeliverySelection);
pickupRadio.addEventListener('change', handleDeliverySelection);

formBodies[0].classList.add('active');
stepCircles[0].classList.add('colorcirculo');
editButtons[0].style.display = 'none'; 
handleDeliverySelection(); 

function handlePaymentSelection() {
    if (radioCredito.checked) {
        tarjetaCredito.classList.add('active');
        tarjetaDebito.classList.remove('active');
    } else if (radioDebito.checked) {
        tarjetaDebito.classList.add('active');
        tarjetaCredito.classList.remove('active');
    }
}

radioCredito.addEventListener('change', handlePaymentSelection);
radioDebito.addEventListener('change', handlePaymentSelection);


handlePaymentSelection();
