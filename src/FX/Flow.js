function unhide(show, hide) {
  const home = document.querySelectorAll('.reveal-btn');
  const map = document.querySelector('.map-container');
  const form = document.querySelector('.input-page');
  const gallery = document.querySelector('.gallery');
  const login = document.querySelector('.login-container');
  const logged = document.querySelector('.logged-in-page');


  // apparently equivalent to the reducer or similar functionallity
  switch (show) {
    case 'home':
      renderSelector('block', home, gallery, map, login);
      break;
    case 'form':
      renderSelector('flex', form, home, gallery, map, logged);
      break;
    case 'gallery':
      renderSelector('flex', gallery, home, map, login, logged);
      break;
    case '.card':
      const cards = document.querySelectorAll(show);
      for (let j = 0; j < cards.length; j++) {
        renderSelector('flex', cards[j], home, login);
      }
      break;
    case 'map':
      renderSelector('grid', map, gallery, home);
      break;
    case '.login-container':
      renderSelector('flex', login, gallery, home, map);
      break;
    case '.logged-in-page':
      renderSelector('flex', logged, login, gallery, map);
      break;
    default:
      for (let j = 0; j < hide.length; j++) {
        renderSelector('grid', show, hide[j]);
      }
  }
}

function renderSelector(displayOption, printable, ...hidable) {
  const array = [printable, ...hidable];
  array.map((element) => {
    switch (NodeList.prototype.isPrototypeOf(element)) {
      case true:
        for (let i = 0; i < element.length; i++) {
          array.indexOf(element) === 0 ? element[i].style.display = displayOption : element[i].style.display = 'none';
        }
        break;
      case false:
        if (element) {
          if (array.indexOf(element) === 0) {
            console.log('that is the element', element.style);
            element.style.display = displayOption;
          }
          element.style.display = 'none';
        }
        // array.indexOf(element) === 0 ? element.style.display = displayOption : element.style.display = 'none';
        break;
      default:
        console.log('default', typeof nodeList);
        break;
    }
  });
}

export default unhide;
