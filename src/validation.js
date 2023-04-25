document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.querySelector('#name'),
        phoneInput = document.querySelector('#phone'),
        emailInput = document.querySelector('#email'),
        submitInput = document.querySelector('#submit');

    let prevPhoneValue;
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
        const numberexp = /[0-9]/i;

        if (numberexp.test(value.at(-1)) === false) {
            if (value.length === 3 && prevPhoneValue > value) {
                return;
            } else {
                value = value.slice(0, value.length - 1);
                setPhoneInputValue(value);
                return;
            }
        }

        let phoneNumber = "+7 (___) ___ __-__"
        value = value.replace(/[^0-9]/g ,"");

        console.log("value: " + value);

        if (value.length <= 1) {
            setPhoneInputValue("+7 ");
            return;
        }

        for (let i= 0; i < value.length - 1; i++)
            phoneNumber = phoneNumber.replace("_", value[i + 1]);

        console.log("phoneNumber: " + phoneNumber);
        // phoneNumber = phoneNumber.replaceAll("x", "");

        // const lastNumberIndex = phoneNumber.search(/\d(?=\D*$)/);

        // console.log("lastNumberIndex: " + lastNumberIndex);
        // phoneNumber = phoneNumber.slice(0, lastNumberIndex + 1);

        // console.log(lastNumberIndex);

        setPhoneInputValue(phoneNumber);

        // let value = e.target.value;
        //
        // if (value.length > 16) {
        //     e.target.value = prevPhoneValue = value.slice(0, value.length - 1);
        //     return;
        // }
        //
        // console.log(value + " " + value.length);
        //
        // const numberexp = /[0-9]/i;
        //
        // if (numberexp.test(value.at(-1)) === false) {
        //     if (value.length === 3 && prevPhoneValue > value) {
        //         return;
        //     } else {
        //         value = value.slice(0, value.length - 1);
        //         e.target.value = prevPhoneValue = value;
        //         return;
        //     }
        // }
        //
        // if (value.length < 3)
        //     value += " ";
        //
        // if (value.length === 7) {
        //     value = value.slice(0, value.length - 1) + " " + value.at(-1);
        // }
        //
        // if (value.length === 11) {
        //     value = value.slice(0, value.length - 1) + " " + value.at(-1);
        // }
        //
        // if (value.length === 14) {
        //     value = value.slice(0, value.length - 1) + "-" + value.at(-1);
        // }
        //
        // e.target.value = prevPhoneValue = value;
    })

    phoneInput.onkeydown = (e) => {
        const key = e.keyCode || e.charCode;

        if (key === 8 || key === 46) {
            console.log("asd");
            console.log(phoneInput.value);
        }
    };

    phoneInput.onselectstart = () => false;

    const setPhoneInputValue = (value) => {
        phoneInput.value = value;
        prevPhoneValue = value;
    }

    emailInput.addEventListener('input', (e) => {
        console.log(e.target.value);
    })
});