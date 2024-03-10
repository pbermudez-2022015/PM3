'use strict'

import { hash, compare } from 'bcrypt'

//Encriptar la contrase;a
export const encrypt = (password) => {
    try {
        return hash(password, 10)
    } catch (err) {
        console.error.err
        return err
    }
}

export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error.err
        return err
    }
}

export const checkUpdate = (data, userId) => {
    if (userId) {
        if (
            Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        ) {
            return false;
        }
        return true;
    } else {
        if (data.email ||
            data.email == '' ||
            data.name ||
            data.name == '' ||
            data.description ||
            data.description == '' ||
            data.categoria) {
            return true;
        }
        return false;
    }
};