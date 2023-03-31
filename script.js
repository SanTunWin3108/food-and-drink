//Go to other html links
const viewMoreButtons = document.querySelectorAll('.card a');

for(let btn of viewMoreButtons) {
    btn.addEventListener('click', (event) => {
        let foodDrinkName = event.target.parentElement.querySelector('h5').innerText.toLowerCase();
        window.location.href = `${foodDrinkName}.html`;
    });
}