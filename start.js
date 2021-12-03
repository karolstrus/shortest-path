
//Initial vals to start
let toggle = false;
// let gridSize = 16;

const slider = document.querySelector(".slider");
const sliderText = document.querySelector(".sliderText");

sliderText.textContent = 'Grid: ' + slider.value + 'x' + slider.value;
slider.oninput = function() {
    sliderText.textContent = 'Grid: ' + this.value + 'x' + this.value;
    document.querySelectorAll('.containerRow').forEach(e => e.remove());
    createGrid(this.value);
    dispStartEndVert(this.value);
}

beforeStart();

let gridSize = slider.value;
createGrid(gridSize);
createStartRestart(gridSize);
dispStartEndVert(gridSize);




