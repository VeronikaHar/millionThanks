function loadList() {
  let apiUrl = 'https://www.millionthankyou.com/api/GetAll';

  return fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('test', data);
    }).catch(e => { console.error(e); });
}

//Function that creates 10px*10px image tiles
function addTileItem() {
  //Shaping DOM structure
  for (let i = 0; i < 1000; i++) {
    let tileEl = document.createElement('div');
    tileEl.classList.add('tile');
    tileEl.setAttribute('id', i);

    let imgEl = document.createElement('img');
    imgEl.classList.add('plus');
    imgEl.setAttribute('src', './css/1.jpg');

    tileEl.appendChild(imgEl);
    let $boardEl = document.getElementsByClassName('board')[0];
    $boardEl.appendChild(tileEl);

    // Event listener that dispalys Thank you modal details upon clicking on image tile
    tileEl.addEventListener('click', () => {
      showDetails(i);
    });
  }
}

// Function that displays modal with thank you details
function showDetails(gridId) {
  (() => {
    let $modalContainer = document.querySelector('#modal-container');

    function showModal(text) {
      // Clear all existing modal content
      $modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      //Add new modal content
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', './css/1.jpg');

      let contentEl = document.createElement('p');
      contentEl.innerText = text;

      let closeBtnEl = document.createElement('button');
      closeBtnEl.classList.add('modal-close');
      closeBtnEl.innerText = 'Back';
      closeBtnEl.addEventListener('click', hideModal);

      modal.appendChild(imgEl);
      modal.appendChild(contentEl);
      modal.appendChild(closeBtnEl);
      $modalContainer.appendChild(modal);
      $modalContainer.classList.add('is-visible');
    }

    showModal(gridId);

    function hideModal() {
      $modalContainer.classList.remove('is-visible');
    }

    //Close modal by pressing ESC on the keyboard
    window.addEventListener('keydown', e => {
      if (
        e.key === 'Escape' &&
        $modalContainer.classList.contains('is-visible')
      ) {
        hideModal();
      }
    });

    //Close modal by clicking outside of the modal
    $modalContainer.addEventListener('click', e => {
      if (e.target === $modalContainer) {
        hideModal();
      }
    });
  })();
}

addTileItem();
loadList();