function backgroundGradFx(initial, final) {
  // selectors
  const background = document.querySelector('body');
  const card = document.querySelectorAll('.toggle-light');
  // const form = document.querySelector('.toggle-form-light');
  let counter = initial;

  const interval = setInterval(() => {
    background.style.backgroundColor = `rgba(57, 53, 53, ${counter / 20} )`;
    // form? form.style.backgroundColor = `rgba(225, 212, 212, ${counter / 10} )` : console.log('stuff');
    for (let i = 0; i < card.length; i++) {
      card[i].style.backgroundColor = `rgba(225, 212, 212, ${counter / 20} )`;
      card[i].style.boxShadow = `3px 4px 18px 2px rgba(8, 7, 8, ${counter * 0.02 + 0.4})`;
    }
    if (counter === final) {
      return clearInterval(interval);
    }
    if (initial === 1) {
      counter += 1;
    } else if (initial === 17) {
      counter -= 1;
    }
  }, 50);
}

export function lightSet(transp) {
  const background = document.querySelector('body');
  const card = document.querySelectorAll('.toggle-light');
  background.style.backgroundColor = `rgba(57, 53, 53, ${transp / 10} )`;
  for (let i = 0; i < card.length; i++) {
    card[i].style.backgroundColor = `rgba(225, 212, 212, ${transp / 10} )`;
  }
}

export default backgroundGradFx;
