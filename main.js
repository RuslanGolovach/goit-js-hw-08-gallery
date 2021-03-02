import galleryItems from './gallery-items.js';

// ссылки
const galleryRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightboxBackdropRef = document.querySelector('.lightbox__overlay');
const btnModalCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightBoxImageRef = document.querySelector('.lightbox__image');
const bodyRef = document.querySelector('body');

// слушатели событий

// рендер разметки галереи

function createGalleryItems(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

const cardsMarkUp = createGalleryItems(galleryItems);

galleryRef.insertAdjacentHTML('beforeend', cardsMarkUp);

// Открытие модалки
function openModalClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  lightBoxRef.classList.add('is-open');
  lightBoxImageRef.src = event.target.dataset.source;
}

galleryRef.addEventListener('click', openModalClick);

// закрытие модалки кнопкой, клику по бэкдропу и Escape

function closeModalBtnClick(event) {
  lightBoxRef.classList.remove('is-open');
  lightBoxImageRef.src = ' ';
}
btnModalCloseRef.addEventListener('click', closeModalBtnClick);
lightboxBackdropRef.addEventListener('click', closeModalBtnClick);

function closeModalEscapeClick(event) {
  if (event.code !== 'Escape') {
    return;
  }
  closeModalBtnClick();
}
bodyRef.addEventListener('keydown', closeModalEscapeClick);
