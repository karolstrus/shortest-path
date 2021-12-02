//Keyboard listeners
function beforeStart() {
    document.addEventListener('keydown', function(event) {
        if (event.code == "ControlLeft") {
            toggle = !toggle;
            createListeners(toggle);
        }
    })
    const slider = document.querySelector(".slider");
    const sliderText = document.querySelector(".sliderText");

    sliderText.textContent = 'Grid: ' + slider.value + 'x' + slider.value;
    // slider.oninput = function() {
    //     sliderText.textContent = 'Grid: ' + this.value + 'x' + this.value;
    //     document.querySelectorAll('.containerRow').forEach(e => e.remove());
    //     createGrid(this.value);
    //     createStartRestart();
    //     dispStartEndVert();
    // }
    return slider.value;
}

///Setting up the initial grid

function createGrid(gridSize) {
    let containerArray = createRows(gridSize);
    let gridArray = addElements(containerArray);
    const gridFrame = document.querySelector(".containerBody");
    for (let i =0; i<gridArray.length; i++) {
        gridFrame.append(gridArray[i]);
    }
    resetGrid(gridSize);
}

function createRows (gridSize) {
    let containerArray = [];
    for (let j = 0; j < gridSize; j++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('containerRow');
        containerArray.push(newDiv);
    }
    return containerArray;
}

function addElements(containerArray) {
    for (let i = 0; i < containerArray.length; i++) {
        for (let j = 0; j < containerArray.length; j++ ) {
            const newDiv = document.createElement("div");
            newDiv.classList.add("gridBox");
            containerArray[i].append(newDiv);
        }
    }
    return containerArray;
}

function createListeners(toggle) {
    let gridItems = document.querySelectorAll(".gridBox");

    gridItems.forEach(function(elem) {
        if (toggle) {
            activateButton(elem);
        } else {
            disableButton(elem);
        }
    });
}

function createStartRestart() {
    let resetButton = document.querySelector(".resetButton");
    let startButton = document.querySelector(".startButton");

    resetButton.addEventListener("click", resetGrid);
    startButton.addEventListener("click", startAlgorithm);
}

function activateButton(elem) {
    elem.addEventListener("mouseover", changeColor);
    const wallText = document.querySelector(".wallSwitch");
    wallText.textContent = "Walls: On";
    wallText.style.backgroundColor = '#70ABAF';
    wallText.style.color = '#F0F7F4';
}

function disableButton(elem) {
    elem.removeEventListener("mouseover", changeColor);
    const wallText = document.querySelector(".wallSwitch");
    wallText.textContent = "Walls: Off";
    wallText.style.backgroundColor = '#F0F7F4';
    wallText.style.color = '#32292F';
}

function changeColor() {
    if (this.style.backgroundColor == "white") {
        this.style.backgroundColor = "black";
    }
}

function resetColor(elem) {
    elem.style.backgroundColor = "white";
}

function resetGrid(gridSize) {
    let gridItems = document.querySelectorAll(".gridBox");
    gridItems.forEach(elem => resetColor(elem));
    dispStartEndVert();
}

function reshapeArray(gridArray, gridSize) {
    let newArr = [];
    while (gridArray.length) {
        newArr.push(gridArray.splice(0, gridSize));
    }
    return newArr;
}

function startEndVertices(gridArray, gridSize) {
    gridArray[2][2].style.backgroundColor = "green";
    gridArray[gridSize-3][gridSize-3].style.backgroundColor = "red";
}

function dispStartEndVert() {
    let gridItems = document.querySelectorAll(".gridBox");
    let gridArray = Array.from(gridItems);
    gridArray = reshapeArray(gridArray, gridSize);
    startEndVertices(gridArray, gridSize);
}