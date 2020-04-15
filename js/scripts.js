//Function that creates 10K 10px*10px image tiles
function addImgItem() {
  //Shaping DOM structure
  for (let i = 0; i < 3000; i++) {
    var $imgEl = document.createElement('img');
    $imgEl.classList.add('tile');
    $imgEl.setAttribute('src', './css/1.jpg');
    var $boardEl = document.getElementsByClassName('board')[0];
    $boardEl.appendChild($imgEl);

    // Event listener that dispalys Thank you modal details upon clicking on image tile
    $imgEl.addEventListener('click', () => {
      // showModal();
    });
  }
}

addImgItem();