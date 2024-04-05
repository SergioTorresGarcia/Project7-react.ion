export const validate = (type, value) => {
    switch (type) {
        case "name":
        case "first_name":
        case "firstName":
        case "nombre":
        case "imie":
        case "imię":
        case "surname":
        case "last_name":
        case "lastName":
        case "apellido":
        case "apellidos":
        case "primer_apellido":
        case "segundo_apellido":
        case "nazwisko":
        case "nazwiska":
        case "cognom":
            if (value.length < 2) {
                return "Name should be at least 2 characters long.";
            }
            return "";

        case "email":
        case "e-mail":
        case "correo":
        case "mail":
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (!emailRegex.test(value)) {
                return "Email should have a correct format.";
            }
            return "";

        case "password":
        case "contraseña":
        case "pass":
        case "haslo":
        case "hasło":
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/;
            if (!passwordRegex.test(value)) {
                return "Password should have at least one big letter, one small letter, one number and have between 8 and 14 characters";
            }
            return "";
        default:
            console.log("ALL SEEMS LEGIT");
    }
};