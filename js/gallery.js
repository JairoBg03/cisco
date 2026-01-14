
/**
 * Cambia la imagen principal de la galería y actualiza el contenido del producto
 * @param {HTMLImageElement} thumbnail - Miniatura clickeada
 */
function toExchangeImage(thumbnail) {
    const mainImage = document.getElementById('img_main');
    const thumbnailSrc = thumbnail.src;
    const container = thumbnail.closest('.thumbnail-container');

    // Animación suave de salida
    mainImage.style.opacity = '0';
    mainImage.style.transform = 'scale(0.95)';

    // Cambiar imagen después de la animación
    setTimeout(() => {
        mainImage.src = thumbnailSrc;

        // Animación de entrada
        mainImage.style.opacity = '1';
        mainImage.style.transform = 'scale(1)';
    }, 200);

    // Actualizar borde activo de miniaturas
    updateActiveThumbnail(thumbnail);

    // Actualizar contenido del producto si hay data attributes
    if (container && container.dataset.productName) {
        updateProductContent(container);
    }
}

/**
 * Actualiza el contenido del producto basado en los data attributes del contenedor
 * @param {HTMLElement} container - Contenedor del thumbnail con los datos del producto
 */
function updateProductContent(container) {
    const productName = container.dataset.productName;
    const productPrice = container.dataset.productPrice;
    const productDescription = container.dataset.productDescription;
    const productSpecs = container.dataset.productSpecs;
    const productDatasheet = container.dataset.productDatasheet;

    // Animación de fade out para el contenido
    const infoSection = document.querySelector('.lg\\:w-full.px-2.animate-fade-in');
    if (infoSection) {
        infoSection.style.opacity = '0';
        infoSection.style.transition = 'opacity 0.2s ease';
    }

    setTimeout(() => {
        // Actualizar nombre del producto
        const nameElement = document.getElementById('product-name');
        if (nameElement && productName) {
            nameElement.textContent = productName;
        }

        // Actualizar precio del producto
        const priceElement = document.getElementById('product-price');
        if (priceElement && productPrice) {
            priceElement.textContent = productPrice;
        }

        // Actualizar descripción del producto
        const descElement = document.getElementById('product-description');
        if (descElement && productDescription) {
            descElement.innerHTML = `<p>${productDescription}</p>`;
        }

        // Actualizar especificaciones técnicas
        if (productSpecs) {
            try {
                const specs = JSON.parse(productSpecs);
                const specsElement = document.getElementById('product-specs');
                if (specsElement && specs.length > 0) {
                    specsElement.innerHTML = specs.map(spec => `
                        <div class="flex items-start">
                            <div class="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div class="ml-2">
                                <p class="text-gray-700">
                                    <span class="font-medium">${spec.label}:</span> ${spec.value}
                                </p>
                            </div>
                        </div>
                    `).join('');
                }
            } catch (e) {
                console.error('Error parsing product specs:', e);
            }
        }

        // Actualizar enlace de ficha técnica
        const datasheetElement = document.getElementById('product-datasheet');
        const datasheetContainer = document.getElementById('datasheet-container');
        if (datasheetElement && datasheetContainer) {
            if (productDatasheet && productDatasheet.trim() !== '') {
                datasheetElement.href = productDatasheet;
                datasheetContainer.style.display = 'flex';
            } else {
                // Ocultar la sección si no hay ficha técnica
                datasheetContainer.style.display = 'none';
            }
        }

        // Animación de fade in para el contenido
        if (infoSection) {
            infoSection.style.opacity = '1';
        }
    }, 200);
}

/**
 * Actualiza el borde de la miniatura activa
 * @param {HTMLImageElement} activeThumbnail - Miniatura activa
 */
function updateActiveThumbnail(activeThumbnail) {
    // Remover clase activa de todas las miniaturas
    const thumbnails = document.querySelectorAll('.thumbnail-container');
    thumbnails.forEach(container => {
        container.classList.remove('border-blue-500', 'border-4');
        container.classList.add('border-gray-200', 'border-2');
    });

    // Agregar clase activa a la miniatura clickeada
    const activeContainer = activeThumbnail.closest('.thumbnail-container');
    if (activeContainer) {
        activeContainer.classList.remove('border-gray-200', 'border-2');
        activeContainer.classList.add('border-blue-500', 'border-4');
    }
}

/**
 * Visualiza imagen en modal
 * @param {string} imageSrc - URL de la imagen
 */
function viewImage(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');

    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Animación de entrada
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

/**
 * Cierra el modal de imagen
 */
function closeModal() {
    const modal = document.getElementById('image-modal');

    if (modal) {
        // Animación de salida
        modal.style.opacity = '0';

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modal.style.opacity = '1';
        }, 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('img_main');
    if (mainImage) {
        mainImage.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    }

    // Agregar transición al modal
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.transition = 'opacity 0.2s ease';
    }

    // Cerrar modal al hacer click fuera de la imagen
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Marcar la primera miniatura como activa
    const firstThumbnail = document.querySelector('.thumbnail-container');
    if (firstThumbnail) {
        firstThumbnail.classList.remove('border-gray-200', 'border-2');
        firstThumbnail.classList.add('border-blue-500', 'border-4');
    }
});
