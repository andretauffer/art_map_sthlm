// import html2canvas from 'html2canvas';
import unhide from './Flow';

// export function screenShot() {
//   html2canvas(document.body).then((canvas) => {
//     const placeHolder = document.querySelector('.screenshot-container');
//     const ss = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
//     const width = window.innerWidth;
//     placeHolder.style.backgroundImage = `url(${ss})`;
//     placeHolder.style.width = `${width}`;
//   });
// }

export function returnToGallery(e) {
  e.stopPropagation();
  const big = document.querySelector('.big');
  big.lastChild.style.display = 'none';
  big.classList.remove('big');
  unhide('.card');
}
