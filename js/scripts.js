//Function that creates 10K 10px*10px image tiles
function addImgItem() {
  //Shaping DOM structure
  for (let i = 0; i < 400; i++) {
    var $imgEl = document.createElement('img');
    $imgEl.classList.add('tile');
    $imgEl.setAttribute('src', './css/1.jpg');
    var $boardEl = document.getElementsByClassName('board')[0];
    console.log('BOard', $boardEl)
    $boardEl.appendChild($imgEl);

    console.log('BOard', $boardEl)

    // Event listener that dispalys Thank you modal details upon clicking on image tile
    $imgEl.addEventListener('click', () => {
      // showModal();
    });
  }
}

addImgItem();