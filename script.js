function populateGrid(size) {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    container.style.setProperty('grid-template-columns', `repeat(${size}, 1fr)`);
    container.style.setProperty('grid-template-rows', `repeat(${size}, 1fr)`);

    if (typeof(size) === 'number') {
        for (let i=0; i < size*size; i++) {
            let child = document.createElement('div');
            child.classList.add('squareDiv');
            child.addEventListener('mouseover', paint);

            container.appendChild(child);
        }
    }   
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function paint(e) {
    if (mode === 'pencil') { // Pencil mode
        this.style.backgroundColor = 'black';
        this.style.opacity = '';

    } else if (mode === 'colors') { // Colors mode
        this.style.backgroundColor = getRandomColor();
        this.style.opacity = '';
        
    } else if (mode === 'greyscale') { // Greyscale mode
        if (this.style.backgroundColor == 'rgb(0, 0, 0)') {
            let opa = parseFloat(this.style.opacity);
            opa += 0.1;

            if (opa <= 1) this.style.opacity = `${opa}`;
        } else {
            this.style.backgroundColor = 'rgb(0, 0, 0)';
            this.style.opacity = '0.1';
        }

    } else if (mode === 'eraser') { // Eraser mode
        this.style.backgroundColor = '';

    }
}

function resize() {
    size = parseInt(window.prompt('What size to resize to (default = 16 (16x16)): ', size));
    populateGrid(size);
}

function clear() {
    populateGrid(size);
}

const container = document.querySelector('#container');
var size = 50;
var mode = 'pencil';

const btnPencil = document.querySelector('#btn_pencil');
const btnColors = document.querySelector('#btn_colors');
const btnGreyScale = document.querySelector('#btn_greyscale');
const btnResize = document.querySelector('#btn_resize');
const btnEraser = document.querySelector('#btn_eraser');
const btnClear = document.querySelector('#btn_clear');

btnPencil.addEventListener('click', function() {
    mode = 'pencil';
});

btnColors.addEventListener('click', function() {
    mode = 'colors';
});

btnGreyScale.addEventListener('click', function() {
    mode = 'greyscale';
})

btnResize.addEventListener('click', resize);

btnEraser.addEventListener('click', function() {
    mode = 'eraser';
});

btnClear.addEventListener('click', clear);

populateGrid(size);
