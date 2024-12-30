const user = {
    failure: {
        unknown: "Hiba történt. Próbálja újra később.",
        fetcherror: "Hiba történt a felhasználók lekérdezése közben.",

        idnotfound: "Nem lehetséges a felhasználó lekérdezése. Nézze meg, hogy a megadott id helyes-e.",
        namenotfound: "Nem lehetséges a felhasználó lekérdezése. Nézze meg, hogy a megadott felhasználónév helyes-e.",
        emailnotfound: "Nem lehetséges a felhasználó lekérdezése. Nézze meg, hogy a megadott e-mail cím helyes-e.",

        emailtaken: "A megadott e-mail cím már használatban van.",
        nametaken: "A megadott felhasználónév már használatban van.",

        loginunfilled: "Felhasználónév/e-mail cím és jelszó megadása kötelező.",
        logininvalid: "Érvénytelen e-mail cím/felhasználónév vagy jelszó.",

        idoremail: "Adjon meg vagy egy felhasználó id-jét, vagy e-mail címét."
    },
    success: {
        registered: "Felhasználó sikeresen regisztrálva!",
        loggedin: "Sikeres bejelentkezés!",
        deleted: "Felhasználó sikeresen törölve!"
    }
}

const console = {
    failure: {
        unknown: "Hiba történt. Próbálja újra később.",
        fetcherror: "Hiba történt a konzolok lekérdezése közben.",

        nametaken: "Már létezik egy konzol ezzel a névvel az adatbázisban.",
        idrequired: "Konzol id szükséges.",
        notfound: "Konzol nem található.",

        invalidformat: "Nincs megadva konzol, vagy érvénytelen formátum.",
        unfilled: "Minden konzolhoz szükséges egy név, megjelenési év és kiadó.",
        thisnametaken: (e) => {
            return `Már létezik konzol a következő névvel: ${e}.`;
        },

        namenotfound: "Konzol nem található név alapján.",
        idnotfound: "Konzol nem található id alapján.",
        idorname: "Adjon meg vagy egy konzol id-t, vagy egy nevet."
    },
    success: {
        added: "Konzol sikeresen létrehozva!",
        addedall: "Az összes konzol sikeresen létrehozva!",
        updated: "Konzol sikeresen frissítve!",
        deleted: "Konzol sikeresen törölve!"
    }
}

const arcade = {
    failure: {
        unknown: "Hiba történt. Próbálja újra később.",
        fetcherror: "Hiba történt az arcade gépek lekérdezése közben.",

        nametaken: "Már létezik egy arcade gép ezzel a névvel az adatbázisban.",
        idrequired: "Arcade gép id szükséges.",
        notfound: "Arcade gép nem található.",

        invalidformat: "Nincs megadva arcade gép, vagy érvénytelen formátum.",
        unfilled: "Minden arcade géphez szükséges egy név, megjelenési év, műfaj és kiadó.",
        thisnametaken: (e) => {
            return `Már létezik arcade gép a következő névvel: ${e}.`;
        },

        namenotfound: "Arcade gép nem található név alapján.",
        idnotfound: "Arcade gép nem található id alapján.",
        idorname: "Adjon meg vagy egy arcade gép id-t, vagy egy nevet."
    },
    success: {
        added: "Arcade gép sikeresen létrehozva!",
        addedall: "Az összes arcade gép sikeresen létrehozva!",
        updated: "Arcade gép sikeresen frissítve!",
        deleted: "Arcade gép sikeresen törölve!"
    }
}

const admin = {
    failure: {
        unauthorized: "Hozzáférés megtagadva. Admin hitelesítő adatok szükségesek."
    }
}

const data = {
    failure: {
        unfilled: "Minden mező kitöltése kötelező."
    }
}

const token = {
    failure: {
        fetcherror: "Hiba történt a tokenek lekérdezése közben."
    }
}

module.exports = {
    user,
    console,
    arcade,
    admin,
    data,
    token
}
