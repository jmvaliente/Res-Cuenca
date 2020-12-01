export function validateData(data) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.email && !data.password && !data.confirmPass) {
        return ({ error: true, msg: "Todos los campos son obligatorios", firebase: null })
    }
    if (!re.test(data.email)) {
        return ({ error: "email", msg: "Email no valido" })
    }
    if (data.password.length <= 6) {
        return ({ error: "password", msg: "La contraseña tiene que tener mas de 6 caracteres" })
    }
    if (data.password !== data.confirmPass) {
        return ({ error: "confirmPass", msg: "Las contraseñas no son iguales" })
    }

    return ({ error: null, msg: "Registrando usuario", validate: true });
}

export function validateLogin(data) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.email && !data.password) {
        return ({ error: true, msg: "Todos los campos son obligatorios", firebase: null, validate: false })
    }
    if (!re.test(data.email)) {
        return ({ error: "email", msg: "Email no valido", validate: false })
    }
    if (data.password.length <= 6) {
        return ({ error: "password", msg: "La contraseña tiene que tener mas de 6 caracteres", validate: false })
    }

    return ({ error: null, msg: "Autenticando Usuario", validate: true });

}