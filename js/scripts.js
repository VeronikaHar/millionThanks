const $modalContainer = document.querySelector('#modal-container'),
  $submitModal = $modalContainer.querySelector('#submit-modal'),
  $displayModal = $modalContainer.querySelector('#display-modal'),
  userRepo = [];

//gets all uploaded thankyou tile info from the API
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
      console.log(userRepo);
    }).catch(e => { console.error(e); });
}

//renders small image tiles
function addTileItem() {
  //Shaping DOM structure
  for (let i = 0; i < 1000; i++) {
    let tileEl = document.createElement('div');
    tileEl.classList.add('tile');
    tileEl.setAttribute('id', i);

    let imgEl = document.createElement('img');

    let imgSrc;
    if (userRepo[i]) {
      imgSrc = userRepo[i].originalImageUrl;
      imgEl.classList.add('custom');
    } else {
      imgSrc = './css/1.jpg';
      imgEl.classList.add('plus');
    }
    imgEl.setAttribute('src', imgSrc);

    tileEl.appendChild(imgEl);
    let $boardEl = document.getElementsByClassName('board')[0];
    $boardEl.appendChild(tileEl);

    // Event listener that dispalys a modal
    tileEl.addEventListener('click', () => {
      if (userRepo[i]) {
        displayModal(i);
      } else {
        uploadModal(i);
      }
    });
  }
}

//modal with a submit form for an empty thank you tile
function uploadModal(id) {
  const formData = [],
    $name = document.getElementById('name'),
    $email = document.getElementById('email'),
    $thx = document.getElementById('thx'),
    $hshtg = document.getElementById('hshtg'),
    $img = document.querySelector('#img'),
    $submitBtn = $submitModal.querySelector('#submit');

  $submitBtn.addEventListener('click', () => {
    formData.push(
      {
        'Name': $name.value,
        'Email ': $email.value,
        'PhoneNumber': '7347347347',
        'GridId ': id.toString(),
        'ThanksTo': $thx.value,
        'HashTags': $hshtg.value,
        'file': $img.files[0]
      }
    );

    // formData.append('Name', $name.value);
    // formData.append('Email ', $email.value);
    // formData.append('PhoneNumber', '7347347347');
    // formData.append('GridId ', id.toString());
    // formData.append('ThanksTo', $thx.value);
    // formData.append('HashTags', $hshtg.value);
    console.log('!!!', formData);

    fetch('https://www.millionthankyou.com/api/UploadData', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Result:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  $modalContainer.classList.remove('hidden');
  $submitModal.classList.remove('hidden');
  closeModal();
}

//Thank You modal for the tiles that were uploaded
function displayModal(i) {
  // Clear all existing modal content
  $contentEl = $displayModal.getElementsByTagName('div')[0];
  $contentEl.innerHTML = '';

  let imgEl = document.createElement('img');
  imgEl.setAttribute('src', userRepo[i].thumbnailImageUrl);

  let pEl = document.createElement('h2');
  if (userRepo[i].thanksTo) {
    pEl.innerText = 'Thank you! ' + userRepo[i].thanksTo;
  } else {
    pEl.innerText = 'Thank you, frontline worker!'
  }
  $contentEl.appendChild(pEl);
  $contentEl.appendChild(imgEl);

  $modalContainer.classList.remove('hidden');
  $displayModal.classList.remove('hidden');
  closeModal();
}

//closes modal on clicking outside of the modal, pressing ESC or close btn
function closeModal() {
  (() => {
    let $closeBtns = document.getElementsByClassName('close');

    [...$closeBtns].forEach(btn => {
      btn.addEventListener('click', hideModal);
    })

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
