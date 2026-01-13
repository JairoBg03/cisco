
/**
 * Cambia la imagen principal de la galería
 * @param {HTMLImageElement} thumbnail - Miniatura clickeada
 */
function toExchangeImage(thumbnail) {
    const mainImage = document.getElementById('img_main');
    const thumbnailSrc = thumbnail.src;

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
