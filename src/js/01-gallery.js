import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';

document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector('.gallery');

  function createGalleryItem(item) {
    const li = document.createElement('li');
    li.classList.add('gallery__item');

    const a = document.createElement('a');
    a.classList.add('gallery__link');
    a.href = item.original;

    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.src = item.preview;
    img.dataset.source = item.original;
    img.alt = item.description;

    a.appendChild(img);
    li.appendChild(a);
    return li;
  }

  const galleryItemsHTML = galleryItems.map(createGalleryItem);
  gallery.append(...galleryItemsHTML);

   new SimpleLightbox('.gallery__link', {});
});
