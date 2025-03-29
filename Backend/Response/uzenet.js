const user = {
  failure: {
    unknown: "Hiba történt. Próbálja újra később.",
    fetcherror: "Hiba történt a felhasználók lekérdezése közben.",

    idnotfound:
      "Nem lehetséges a felhasználó lekérdezése. Nézze meg, hogy a megadott id helyes-e.",
    namenotfound:
      "Nem lehetséges a felhasználó lekérdezése. Nézze meg, hogy a megadott felhasználónév helyes-e.",
    emailnotfound:
      "Nem lehetséges a felhasználó lekérdezése. Nézze meg, hogy a megadott e-mail cím helyes-e.",

    emailtaken: "A megadott e-mail cím már használatban van.",
    nametaken: "A megadott felhasználónév már használatban van.",

    loginunfilled: "Felhasználónév/e-mail cím és jelszó megadása kötelező.",
    logininvalid: "Érvénytelen e-mail cím/felhasználónév vagy jelszó.",

    idoremail: "Adjon meg vagy egy felhasználó id-jét, vagy e-mail címét.",
    machineAlreadyExists: "Ez a gép már szerepel a könyvtárában.",
  },
  success: {
    registered: "Felhasználó sikeresen regisztrálva!",
    loggedin: "Sikeres bejelentkezés!",
    deleted: "Felhasználó sikeresen törölve!",
    adminUpdated: "Felhasználó sikeresen adminisztrátorrá téve!",
    profileupdated: "Profil sikeresen megváltoztatva",
    machineAdded: "Gép sikeresen hozzáadva a könyvtárhoz",
    updated: "Felhasználó sikeresen frissítve!",
  },
};

const company = {
  failure: {
    unknown: "Hiba történt. Próbálja újra később.",
    fetcherror: "Hiba történt a cégek lekérdezése közben.",

    idnotfound:
      "Nem lehetséges a cég lekérdezése. Nézze meg, hogy a megadott id helyes-e.",
    namenotfound:
      "Nem lehetséges a cég lekérdezése. Nézze meg, hogy a megadott cégnév helyes-e.",
    emailnotfound:
      "Nem lehetséges a cég lekérdezése. Nézze meg, hogy a megadott e-mail cím helyes-e.",

    emailtaken: "A megadott e-mail cím már használatban van.",
    nametaken: "A megadott cégnév már használatban van.",

    loginunfilled: "Cégnév/e-mail cím és jelszó megadása kötelező.",
    logininvalid: "Érvénytelen e-mail cím/cégnév vagy jelszó.",

    idoremail: "Adjon meg vagy egy cég id-jét, vagy e-mail címét.",
  },
  success: {
    registered: "Cég sikeresen regisztrálva!",
    loggedin: "Sikeres bejelentkezés!",
    deleted: "Cég sikeresen törölve!",
  },
};

const address = {
  failure: {
    unknown: "Hiba történt. Próbálja újra később.",
  },
  success: {
    created: "Lakcím sikeresen hozzáadva.",
  },
};

const ad = {
  failure: {
    unknown: "Hiba történt. Próbálja újra később.",
  },
  success: {
    created: "Hírdetés sikeresen közzétéve.",
  },
};

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
    idorname: "Adjon meg vagy egy konzol id-t, vagy egy nevet.",
  },
  success: {
    added: "Konzol sikeresen létrehozva!",
    addedall: "Az összes konzol sikeresen létrehozva!",
    updated: "Konzol sikeresen frissítve!",
    deleted: "Konzol sikeresen törölve!",
  },
};

const arcade = {
  failure: {
    unknown: "Hiba történt. Próbálja újra később.",
    fetcherror: "Hiba történt az arcade gépek lekérdezése közben.",

    nametaken: "Már létezik egy arcade gép ezzel a névvel az adatbázisban.",
    idrequired: "Arcade gép id szükséges.",
    notfound: "Arcade gép nem található.",

    invalidformat: "Nincs megadva arcade gép, vagy érvénytelen formátum.",
    unfilled:
      "Minden arcade géphez szükséges egy név, megjelenési év, műfaj és kiadó.",
    thisnametaken: (e) => {
      return `Már létezik arcade gép a következő névvel: ${e}.`;
    },

    namenotfound: "Arcade gép nem található név alapján.",
    idnotfound: "Arcade gép nem található id alapján.",
    idorname: "Adjon meg vagy egy arcade gép id-t, vagy egy nevet.",
  },
  success: {
    added: "Arcade gép sikeresen létrehozva!",
    addedall: "Az összes arcade gép sikeresen létrehozva!",
    updated: "Arcade gép sikeresen frissítve!",
    deleted: "Arcade gép sikeresen törölve!",
  },
};

const pinball = {
  failure: {
    unknown: "Hiba történt. Próbálja újra később.",
    fetcherror: "Hiba történt az flipper gépek lekérdezése közben.",

    nametaken: "Már létezik egy flipper gép ezzel a névvel az adatbázisban.",
    idrequired: "Flipper gép id szükséges.",
    notfound: "Flipper gép nem található.",

    invalidformat: "Nincs megadva flipper gép, vagy érvénytelen formátum.",
    unfilled:
      "Minden flipper géphez szükséges egy név, megjelenési év, műfaj és kiadó.",
    thisnametaken: (e) => {
      return `Már létezik flipper gép a következő névvel: ${e}.`;
    },

    namenotfound: "Flipper gép nem található név alapján.",
    idnotfound: "Flipper gép nem található id alapján.",
    idorname: "Adjon meg vagy egy flipper gép id-t, vagy egy nevet.",
  },
  success: {
    added: "Flipper gép sikeresen létrehozva!",
    addedall: "Az összes flipper gép sikeresen létrehozva!",
    updated: "Flipper gép sikeresen frissítve!",
    deleted: "Flipper gép sikeresen törölve!",
  },
};

const admin = {
  failure: {
    unauthorized: "Hozzáférés megtagadva. Admin hitelesítő adatok szükségesek.",
  },
};

const data = {
  failure: {
    unfilled: "Minden mező kitöltése kötelező.",
  },
};

const token = {
  failure: {
    fetcherror: "Hiba történt a tokenek lekérdezése közben.",
  },
};

const upload = {
  failure: {
    imguploaderror: "Hiba történt a kép feltöltése közben.",
  },
};

const post = {
  failure: {
    unknown: "Hiba történt a poszt feldolgozása közben. Próbálja újra később.",
    fetcherror: "Hiba történt a posztok lekérdezése közben.",
    notfound: "A poszt nem található.",
  },
  success: {
    created: "Poszt sikeresen létrehozva!",
    deleted: "Poszt sikeresen törölve!",
  },
};

const comment = {
  failure: {
    unknown:
      "Hiba történt a megjegyzés feldolgozása közben. Próbálja újra később.",
    fetcherror: "Hiba történt a megjegyzések lekérdezése közben.",
    notfound: "A megjegyzés nem található.",
  },
  success: {
    created: "Megjegyzés sikeresen létrehozva!",
    deleted: "Megjegyzés sikeresen törölve!",
  },
};

module.exports = {
  user,
  company,
  address,
  ad,
  console,
  arcade,
  pinball,
  admin,
  data,
  token,
  upload,
  post,
  comment,
};
