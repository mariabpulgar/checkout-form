// Selección de elementos necesarios
const formTitles = document.querySelectorAll('.form-field-title');
const formBodies = document.querySelectorAll('.form-body');
const editButtons = document.querySelectorAll('.form-field-title img'); // Botones de edición
const stepCircles = document.querySelectorAll('.step-circle'); // Círculos del stepper
const lines = document.querySelectorAll('.line'); // Líneas entre pasos

const btnEnvio = document.getElementById('btn-envio');
const btnPago = document.getElementById('btn-pago');
const btnFinalizar = document.getElementById('btn-finalizar');
const deliveryRadio = document.getElementById('home');
const pickupRadio = document.getElementById('store');
const deliveryCard = document.querySelector('.delivery-card');
const pickupCard = document.querySelector('.pickup-card');

// Función para alternar acordeones y actualizar el stepper
function toggleAccordion(currentIndex, nextIndex) {
    // Cerrar el acordeón actual
    formBodies[currentIndex].classList.add('hidden');
    formBodies[currentIndex].classList.remove('active');
    editButtons[currentIndex].style.display = 'block'; // Mostrar botón de edición del acordeón cerrado
    stepCircles[currentIndex].classList.remove('colorcirculo'); // Desactivar el círculo actual

    // Activar círculos de pasos anteriores
    stepCircles.forEach((circle, index) => {
        if (index <= currentIndex) {
            circle.classList.add('colorcirculo'); // Mantener el color en los pasos completados
        } else {
            circle.classList.remove('colorcirculo'); // Quitar el color en los pasos posteriores
        }
    });

    // Activar el siguiente acordeón, si existe
    if (nextIndex !== null) {
        formBodies[nextIndex].classList.remove('hidden');
        formBodies[nextIndex].classList.add('active');
        editButtons[nextIndex].style.display = 'none'; // Ocultar botón de edición del acordeón abierto
        stepCircles[nextIndex].classList.add('colorcirculo'); // Activar el círculo del siguiente paso

        // Activar la línea correspondiente al paso actual
        if (lines[nextIndex - 1]) {
            lines[nextIndex - 1].classList.add('active');
        }
    }
}

// Añadir eventos a los círculos del stepper para abrir el acordeón correspondiente
stepCircles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        formBodies.forEach((body, i) => {
            body.classList.add('hidden');
            body.classList.remove('active');
            editButtons[i].style.display = 'block'; // Mostrar botones de edición
            stepCircles[i].classList.remove('colorcirculo'); // Desactivar todos los círculos
            if (lines[i]) {
                lines[i].classList.remove('active'); // Desactivar todas las líneas
            }
        });

        // Abrir el acordeón correspondiente al círculo clicado
        formBodies[index].classList.remove('hidden');
        formBodies[index].classList.add('active');
        editButtons[index].style.display = 'none'; // Ocultar el botón de edición del acordeón abierto
        stepCircles[index].classList.add('colorcirculo'); // Activar el círculo actual

        // Activar líneas y círculos previos
        for (let i = 0; i < index; i++) {
            stepCircles[i].classList.add('colorcirculo');
            if (lines[i]) {
                lines[i].classList.add('active');
            }
        }
    });
});



// Función para manejar el cambio entre entrega a domicilio y recoger en tienda
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

// Añadir eventos a los títulos de acordeones
formTitles.forEach((title, index) => {
    title.addEventListener('click', () => {
        const isActive = formBodies[index].classList.contains('active');
        formBodies.forEach((body, i) => {
            body.classList.add('hidden');
            body.classList.remove('active');
            editButtons[i].style.display = 'block'; // Mostrar botones de edición
            stepCircles[i].classList.remove('colorcirculo'); // Desactivar todos los círculos
            if (lines[i]) {
                lines[i].classList.remove('active'); // Desactivar todas las líneas
            }
        });

        if (!isActive) {
            formBodies[index].classList.remove('hidden');
            formBodies[index].classList.add('active');
            editButtons[index].style.display = 'none'; // Ocultar botón de edición del acordeón abierto
            stepCircles[index].classList.add('colorcirculo'); // Activar el círculo actual
            if (index > 0 && lines[index - 1]) {
                lines[index - 1].classList.add('active'); // Activar línea previa
            }
        }
    });
});

// Event listener para el botón "Ir a envío"
btnEnvio.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAccordion(0, 1); // Cerrar Datos Personales y abrir Datos de Envío
});

// Event listener para el botón "Ir a pago"
btnPago.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAccordion(1, 2); // Cerrar Datos de Envío y abrir Datos de Pago
});

// Event listener para el botón "Finalizar"
btnFinalizar.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAccordion(2, null); // Cerrar Datos de Pago
});

// Event listeners para los radio buttons de entrega
deliveryRadio.addEventListener('change', handleDeliverySelection);
pickupRadio.addEventListener('change', handleDeliverySelection);

// Configuración inicial: establecer el primer paso como activo
formBodies[0].classList.add('active');
stepCircles[0].classList.add('colorcirculo');
editButtons[0].style.display = 'none'; // Ocultar el botón de edición del primer paso
handleDeliverySelection(); // Configurar vista inicial para entrega/recogida
