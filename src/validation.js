document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.querySelector('#name'),
        phoneInput = document.querySelector('#phone'),
        emailInput = document.querySelector('#email'),
        submitInput = document.querySelector('#submit');

    phoneInput.value = "+7 ";

    nameInput.addEventListener('input', (e) => {
        let value = e.target.value;

        let alphabetexp = /[А-Я]/i;

        if (alphabetexp.test(value.at(-1)) === false) {
            value = value.slice(0, value.length - 1);
            e.target.value = value;
            return;
        }

        if (value.length === 1)
            value = value.toUpperCase();

        if (value.length > 1)
            value = value.slice(0,1) + value.slice(1, value.length).toLowerCase();

        if (value.length > 20)
            value = value.slice(0, value.length - 1);

        e.target.value = value;
    });

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value;

        console.log(value.length);

        let alphabetexp = /[0-9]/i;

        if (alphabetexp.test(value.at(-1)) === false) {
            value = value.slice(0, value.length - 1);
            e.target.value = value;
            return;
        }



        if (value.length < 3)
            value += " ";

        e.target.value = value;
    })

    emailInput.addEventListener('input', (e) => {
        console.log(e.target.value);
    })
});