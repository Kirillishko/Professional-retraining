document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.querySelector('#name'),
        phoneInput = document.querySelector('#phone'),
        emailInput = document.querySelector('#email'),
        submitInput = document.querySelector('#submit');

    let prevPhoneValue;
    phoneInput.value = "+7 (123) 456 78-90";
    // phoneInput.value = "+7 (___) ___ __-__";

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


    // phoneInput.addEventListener('input', (e) => {
    //     let value = e.target.value;
    //     const numberexp = /[0-9]/i;
    //
    //     if (numberexp.test(value.at(-1)) === false) {
    //         if (value.length === 3 && prevPhoneValue > value) {
    //             return;
    //         } else {
    //             value = value.slice(0, value.length - 1);
    //             setPhoneInputValue(value);
    //             return;
    //         }
    //     }
    //
    //     let phoneNumber = "+7 (___) ___ __-__"
    //     value = value.replace(/[^0-9]/g ,"");
    //
    //     // console.log("value: " + value);
    //
    //     if (value.length <= 1) {
    //         setPhoneInputValue("+7 ");
    //         return;
    //     }
    //
    //     for (let i = 0; i < value.length - 1; i++)
    //         phoneNumber = phoneNumber.replace("_", value[i + 1]);
    //
    //     // console.log("phoneNumber: " + phoneNumber);
    //     // phoneNumber = phoneNumber.replaceAll("x", "");
    //
    //     // const lastNumberIndex = phoneNumber.search(/\d(?=\D*$)/);
    //
    //     // console.log("lastNumberIndex: " + lastNumberIndex);
    //     // phoneNumber = phoneNumber.slice(0, lastNumberIndex + 1);
    //
    //     // console.log(lastNumberIndex);
    //
    //     setPhoneInputValue(phoneNumber);
    //
    //     // let value = e.target.value;
    //     //
    //     // if (value.length > 16) {
    //     //     e.target.value = prevPhoneValue = value.slice(0, value.length - 1);
    //     //     return;
    //     // }
    //     //
    //     // console.log(value + " " + value.length);
    //     //
    //     // const numberexp = /[0-9]/i;
    //     //
    //     // if (numberexp.test(value.at(-1)) === false) {
    //     //     if (value.length === 3 && prevPhoneValue > value) {
    //     //         return;
    //     //     } else {
    //     //         value = value.slice(0, value.length - 1);
    //     //         e.target.value = prevPhoneValue = value;
    //     //         return;
    //     //     }
    //     // }
    //     //
    //     // if (value.length < 3)
    //     //     value += " ";
    //     //
    //     // if (value.length === 7) {
    //     //     value = value.slice(0, value.length - 1) + " " + value.at(-1);
    //     // }
    //     //
    //     // if (value.length === 11) {
    //     //     value = value.slice(0, value.length - 1) + " " + value.at(-1);
    //     // }
    //     //
    //     // if (value.length === 14) {
    //     //     value = value.slice(0, value.length - 1) + "-" + value.at(-1);
    //     // }
    //     //
    //     // e.target.value = prevPhoneValue = value;
    // })

    phoneInput.onkeydown = (e) => {
        e.preventDefault();
        const key = e.key;
        const numberexp = /[0-9]/i;
        let value = phoneInput.value;

        if (key === 'Delete' || key === 'Backspace') {
            if (phoneInput.selectionStart === phoneInput.selectionEnd) {
                value[phoneInput.selectionStart - 1];
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
        }
        else {
            value = value.slice(0, phoneInput.selectionStart) + key + value.slice(phoneInput.selectionEnd + 1);
        }

        correctPhoneNumber(value);
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
            return 5;

        for (let i = index - 1; i > 4; i--) {
            if (numberexp.test(value[i]) && value[i - 1] !== " ") {
                if ((value[i + 1] === ")" && index !== i + 1) ||
                    (value[i + 1] === " " && index !== i + 1))
                    return i + 1;
                else if (value[i - 1] === "-")
                    return i - 1;
                else
                    return i;
            }
        }
    }

    const findClosestRightNumberIndex = (value, index) => {
        const numberexp = /[0-9]/i;

        if (index < 4)
            return 4;

        for (let i = index + 1; i < value.length; i++) {
            if (value[i - 1] === ")")
                return i + 2;
            if (value[i - 1] === " " || value[i - 1] === "-")
                return i + 1;
            else
                return i;
        }

        return value.length;
    }

    // phoneInput.onfocus = () => {
    //     setTimeout(() => {
    //         const value = phoneInput.value;
    //         const lastNumberIndex = value.search(/\d(?=\D*$)/);
    //         console.log("focus " + lastNumberIndex);
    //
    //         phoneInput.selectionStart = phoneInput.selectionEnd = lastNumberIndex + 1;
    //     });
    // }

    const setPhoneInputValue = (value) => {
        phoneInput.value = value;
        prevPhoneValue = value;
    }

    emailInput.addEventListener('input', (e) => {
        console.log(e.target.value);
    })
});