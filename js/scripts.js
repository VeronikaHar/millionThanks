//Function that creates 10K 10px*10px image tiles
function addTileItem() {
  //Shaping DOM structure
  for (let i = 0; i < 1000; i++) {
    let $tileEl = document.createElement('div');
    $tileEl.classList.add('tile');
    let $imgEl = document.createElement('img');
    $imgEl.setAttribute('src', './css/1.jpg');
    $tileEl.appendChild($imgEl);
    let $boardEl = document.getElementsByClassName('board')[0];
    $boardEl.appendChild($tileEl);

    // Event listener that dispalys Thank you modal details upon clicking on image tile
    $tileEl.addEventListener('click', () => {
      // showModal();
    });
  }
}

addTileItem();