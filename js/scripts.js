const userRepo = [];

function getAll() {
  let apiUrl = 'https://www.millionthankyou.com/api/GetAll';

  return fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach(user => {
        userRepo.push(user);
      });
      addTileItem();
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

    let imgSrc;
    if (userRepo[i]) {
      imgSrc = userRepo[i].thumbnailImageUrl;
      imgEl.classList.add('custom');
    } else {
      imgSrc = './css/1.jpg';
      imgEl.classList.add('plus');
    }
    imgEl.setAttribute('src', imgSrc);

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
    let $modalContainer = document.querySelector('#modal-container'),
      $submitModal = $modalContainer.querySelector('#submit-modal'),
      $displayModal = $modalContainer.querySelector('#display-modal'),
      $closeBtns = document.getElementsByClassName('modal-close');

    [...$closeBtns].forEach(btn => {
      btn.addEventListener('click', hideModal);
    })

    //modal with a submit form for an empty thank you tile
    function submitModal(id) {

      // const formData = new FormData();
      // const img = document.querySelector('#img');

      // formData.append('Name', 'My Vegas Vacation');
      // formData.append('file', img.files[0]);

      // fetch('https://example.com/posts', {
      //   method: 'POST',
      //   body: formData,
      // })
      //   .then((response) => response.json())
      //   .then((result) => {
      //     console.log('Success:', result);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
      $modalContainer.classList.remove('hidden');
      $submitModal.classList.remove('hidden');
    }

    //Thank You modal for the tiles that were uploaded
    function displayModal(text) {
      // Clear all existing modal content
      $contentEl = $displayModal.getElementsByTagName('p')[0];
      $contentEl.innerText = '';
      $contentEl.innerText = text;

      $modalContainer.classList.remove('hidden');
      $displayModal.classList.remove('hidden');
    }

    submitModal(gridId);

    function hideModal() {
      $modalContainer.classList.add('hidden');
      $displayModal.classList.add('hidden');
      $submitModal.classList.add('hidden');
    }

    //Close modal by pressing ESC on the keyboard
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && $modalContainer.classList !== 'hidden') {
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


getAll();
