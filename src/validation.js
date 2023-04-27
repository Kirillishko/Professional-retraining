document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('#form'),
        nameInput = document.querySelector('#name'),
        phoneInput = document.querySelector('#phone'),
        emailInput = document.querySelector('#email'),
        submitInput = document.querySelector('#submit');

    let prevPhoneValue;
    // phoneInput.value = "+7 (123) 456 78-90";
    phoneInput.value = "+7 (___) ___ __-__";

    nameInput.addEventListener('input', (e) => {
        let value = e.target.value;

        let alphabetexp = /[А-Я]/i;

        if (alphabetexp.test(value.at(-1)) === false) {
            value = value.slice(0, value.length - 1);
            e.target.value = value;
            return;
        }

        value = value.slice(0,1).toUpperCase() + value.slice(1);

        if (value.length > 1)
            value = value.slice(0,1) + value.slice(1, value.length).toLowerCase();

        if (value.length > 20)
            value = value.slice(0, value.length - 1);

        e.target.value = value;
    });

    phoneInput.onkeydown = (e) => {
        e.preventDefault();
        const key = e.key;
        const numberexp = /[0-9]/i;
        let value = phoneInput.value;

        const startPos = phoneInput.selectionStart;
        const endPos = phoneInput.selectionEnd;

        if (key === 'Delete' || key === 'Backspace') {

            if (phoneInput.selectionStart === phoneInput.selectionEnd) {
                if (numberexp.test(value[phoneInput.selectionStart - 1]) === true) {
                    if (key === 'Backspace' && phoneInput.selectionStart >= 2)
                        value = value.slice(0, phoneInput.selectionStart - 1) + value.slice(phoneInput.selectionStart);
                    else
                        value = value.slice(0, phoneInput.selectionStart) + value.slice(phoneInput.selectionStart + 1);
                }
            } else {
                value = value.slice(0, phoneInput.selectionStart) + value.slice(phoneInput.selectionEnd);
            }

            correctPhoneNumber(value);
            setTimeout(() => {
                phoneInput.selectionStart = phoneInput.selectionEnd = findClosestLeftNumberIndex(value, startPos);
            })
            return;
        }

        if (key === 'ArrowLeft') {
            phoneInput.selectionStart = phoneInput.selectionEnd =
                findClosestLeftNumberIndex(value, phoneInput.selectionStart);
            return;
        }

        if (key === 'ArrowRight') {
            phoneInput.selectionStart = phoneInput.selectionEnd =
                findClosestRightNumberIndex(value, phoneInput.selectionEnd);
            return;
        }

        if (numberexp.test(key) === false) {
            return;
        }

        if (phoneInput.selectionStart === phoneInput.selectionEnd) {
            value = value.slice(0, phoneInput.selectionStart) + key + value.slice(phoneInput.selectionEnd);
        } else {
            value = value.slice(0, phoneInput.selectionStart) + key + value.slice(phoneInput.selectionEnd + 1);
        }

        correctPhoneNumber(value);

        const lastNumberIndex = phoneInput.value.search(/\d(?=\D*$)/);
        phoneInput.selectionStart = phoneInput.selectionEnd = lastNumberIndex + 1;
    };

    const correctPhoneNumber = (value) => {
        let phoneNumber = "+7 (___) ___ __-__";
        value = value.replace(/[^0-9]/g ,"");

        if (value.length === 1) {
            setPhoneInputValue(phoneNumber);
            return;
        }

        for (let i = 0; i < value.length - 1; i++)
            phoneNumber = phoneNumber.replace("_", value[i + 1]);

        phoneInput.value = phoneNumber;
    }

    const findClosestLeftNumberIndex = (value, index) => {
        const numberexp = /[0-9]/i;

        if (index <= 5)
            return 4;

        for (let i = index; i > 4; i--) {
            if (numberexp.test(value[i - 2]))
                return i - 1;
        }
    }

    const findClosestRightNumberIndex = (value, index) => {
        const numberexp = /[0-9]/i;

        if (index <= 4)
            return 5;

        for (let i = index; i < value.length; i++) {
            if (numberexp.test(value[i]))
                return i + 1;
        }

        if (value[index] !== "_") {
            for (let i = index; i < value.length; i++) {
                if (value[i] === "_")
                    return i;
            }
        }

        return index;
    }

    const setPhoneInputValue = (value) => {
        phoneInput.value = value;
        prevPhoneValue = value;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let nameCorrect, phoneCorrect, emailCorrect;
        nameCorrect = phoneCorrect = emailCorrect = false;

        nameCorrect = nameInput.value.length > 2;

        const phoneNumbers = phoneInput.value.replace(/[^0-9]/g ,"");
        phoneCorrect = phoneNumbers.length === 11;

        const emailreg = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
        emailCorrect = emailreg.test(emailInput.value);

        if (nameCorrect && phoneCorrect && emailCorrect) {

        }
    })
});