const user = {
    failure: {
        unknown: "An error has occurred. Please try again later.",
        fetcherror: "An error occurred while fetching users.",

        idnotfound: "Cannot fetch requested user. Check if the entered id is correct",
        namenotfound: "Cannot fetch requested user. Check if the entered username is correct",
        emailnotfound: "Cannot fetch requested user. Check if the entered email is correct.",

        emailtaken: "The entered email address is already in use.",
        nametaken: "The entered username is already in use.",

        loginunfilled: "Username/email, and password are required.",
        logininvalid: "Invalid email/username or password.",

        idoremail: "Provide either user id or email address."
    },
    success: {
        registered: "User registered successfully!",
        loggedin: "Logged in successfully!",
        deleted: "User deleted successfully!"
    }
}

const console = {
    failure: {
        unknown: "An error has occurred. Please try again later.",
        fetcherror: "An error occurred while fetching consoles.",

        nametaken: "A console with that name already exists in the database.",
        idrequired: "Console id required.",
        notfound: "Console not found.",

        invalidformat: "No consoles provided, or invalid format.",
        unfilled: "Each console must have a name, release year, and publisher.",
        thisnametaken: (e) => {
            return `Console with name ${e} already exists.`;
        },

        namenotfound: "Console not found by name.",
        idnotfound: "Console not found by id.",
        idorname: "Provide either console id or name."
    },
    success: {
        added: "Console created successfully!",
        addedall: "All consoles created successfully",
        updated: "Console updated successfully!",
        deleted: "Console successfully deleted!"
    }
}

const arcade = {
    failure: {
        unknown: "An error has occurred. Please try again later.",
        fetcherror: "An error occurred while fetching arcade machines.",

        nametaken: "An arcade machine with that name already exists in the database.",
        idrequired: "Arcane machine id required.",
        notfound: "Arcade machine not found.",

        invalidformat: "No arcade machines provided, or invalid format.",
        unfilled: "Each arcade machine must have a name, release year, genre, and publisher.",
        thisnametaken: (e) => {
            return `Arcade machine with name ${e} already exists.`;
        },

        namenotfound: "Arcade machine not found by name.",
        idnotfound: "Arcade machine not found by id.",
        idorname: "Provide either arcade machine id or name."
    },
    success: {
        added: "Arcade machine created successfully!",
        addedall: "All arcade machines created successfully",
        updated: "Arcade machine updated successfully!",
        deleted: "Arcade machine successfully deleted!"
    }
}

const pinball = {
    failure: {
        unknown: "An error has occurred. Please try again later.",
        fetcherror: "An error occurred while fetching pinball machines.",

        nametaken: "An pinball machine with that name already exists in the database.",
        idrequired: "Arcane machine id required.",
        notfound: "Pinball machine not found.",

        invalidformat: "No pinball machines provided, or invalid format.",
        unfilled: "Each pinball machine must have a name, release year, genre, and publisher.",
        thisnametaken: (e) => {
            return `Pinball machine with name ${e} already exists.`;
        },

        namenotfound: "Pinball machine not found by name.",
        idnotfound: "Pinball machine not found by id.",
        idorname: "Provide either pinball machine id or name."
    },
    success: {
        added: "Pinball machine created successfully!",
        addedall: "All pinball machines created successfully",
        updated: "Pinball machine updated successfully!",
        deleted: "Pinball machine successfully deleted!"
    }
}

const admin = {
    failure: {
        unauthorized: "Unauthorized. Admin credentials required."
    }
}

const data = {
    failure: {
        unfilled: "All fields are required."
    }
}

const token = {
    failure: {
        fetcherror: "An error occurred while fetching tokens."
    }
}

module.exports = {
    user,
    console,
    arcade,
    pinball,
    admin,
    data,
    token
}