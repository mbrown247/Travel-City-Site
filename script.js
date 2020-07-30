// const sunMoonContainer = document.querySelector('.sun-moon-container')

// document.querySelector('.theme-toggle-button').addEventListener('click', () => {
//     document.body.classList.toggle('dark')
//     const currentRotation = parseInt(getComputedStyle(sunMoonContainer).getPropertyValue('--rotation'))
//     sunMoonContainer.style.setProperty('--rotation', currentRotation + 180)
// })

const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function () {
    // Current Index of word

    const current = this.wordIndex % this.words.length;
    // Get Full text of current word
    const fullTxt = this.words[current]

    if (this.isDeleting) {
        // Remove charactar
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add Charactar
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }


    // Insert txt into element
    this.txtElement.innerHTML = `</span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait
        // Set Delete to true
        this.isDeleting = true;
    }

    else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}


const hamburger = document.getElementById('hamburger');
const navUL = document.getElementById('nav-ul');

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('show');
})