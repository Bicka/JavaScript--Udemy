'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const openModalFunction =  () => {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
}

const closeModalFucntion = () =>{
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
}
const closeModalFucntionESC = (event) =>{
    if(event.key === "Escape" && !modal.classList.contains("hidden")) {
        overlay.classList.add("hidden");
        modal.classList.add("hidden");
    }
    
}

const btnsOpen = document.querySelectorAll('.show-modal');

btnsOpen.forEach(btn => btn.addEventListener("click", openModalFunction));
btnCloseModal.addEventListener('click',closeModalFucntion);
overlay.addEventListener('click', closeModalFucntion);
document.addEventListener("keydown",closeModalFucntionESC);