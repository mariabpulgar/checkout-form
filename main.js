// Selección de elementos
const formTitles = document.querySelectorAll('.form-field-title');
const formBodies = document.querySelectorAll('.form-body');
const btnEnvio = document.getElementById('btn-envio');
const btnPago = document.getElementById('btn-pago');
const btnFinalizar = document.getElementById('btn-finalizar');
const deliveryRadio = document.getElementById('home');
const pickupRadio = document.getElementById('store');
const deliveryCard = document.querySelector('.delivery-card');
const pickupCard = document.querySelector('.pickup-card');

// Función para manejar la apertura y cierre de acordeones
function toggleAccordion(currentIndex, nextIndex) {
    formBodies[currentIndex].classList.add('hidden');
    formBodies[currentIndex].classList.remove('active');
    if (nextIndex !== null) {
        formBodies[nextIndex].classList.remove('hidden');
        formBodies[nextIndex].classList.add('active');
    }
}

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

// Inicializa el comportamiento de los acordeones al hacer clic en sus títulos
formTitles.forEach((title, index) => {
    title.addEventListener('click', () => {
        const isActive = formBodies[index].classList.contains('active');
        formBodies.forEach((body) => {
            body.classList.add('hidden');
            body.classList.remove('active');
        });
        if (!isActive) {
            formBodies[index].classList.remove('hidden');
            formBodies[index].classList.add('active');
        }
    });
});

// Event listener para el botón "Ir a envío"
btnEnvio.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del botón
    toggleAccordion(0, 1); // Cierra el acordeón de Datos Personales y abre el de Datos de Envío
});

// Event listener para el botón "Ir a pago"
btnPago.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del botón
    toggleAccordion(1, 2); // Cierra el acordeón de Datos de Envío y abre el de Datos de Pago
});

// Event listener para el botón "Finalizar"
btnFinalizar.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del botón
    toggleAccordion(2, null); // Cierra el acordeón de Datos de Pago sin realizar ninguna otra acción
});

// Event listeners para los radio buttons de entrega
deliveryRadio.addEventListener('change', handleDeliverySelection);
pickupRadio.addEventListener('change', handleDeliverySelection);

// Configuración inicial
handleDeliverySelection(); // Asegura que se muestre la opción correcta al cargar la página
