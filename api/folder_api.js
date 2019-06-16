import axios from 'axios'

const FOLDER_API = 'http://localhost:8000/folder/'
const FOLDERS_API = 'http://localhost:8000/folders/'

const USER_API = 'http://localhost:8000/user/'



export async function getFolders() {
    try {
        const respone = await axios.get(FOLDERS_API)
        return respone
    } catch (err) {
        return err
    }
}

export async function getRootFolder() {
    try {
        const respone = await axios.get(FOLDER_API + 'root')
        return respone
    } catch (err) {
        return err
    }
}

export async function getUserByName(username) {
    try {
        const respone = await axios.get(USER_API + username)
        return respone
    } catch (err) {
        return err
    }
}


export async function createFolder(folder) {
    try {
        const respone = await axios.post(FOLDER_API, {
            folder: folder
        })
        return respone
    } catch (err) {
        return err
    }
}

export async function updateFolder(folder) {
    try {
        const respone = await axios.put(FOLDER_API + `${folder._id}`, {
            folder: folder
        })
        return respone
    } catch (err) {
        return err
    }
}

export async function deleteFolder(folderId) {
    try {
        const respone = await axios.delete(FOLDER_API + `${folderId}`)
        return respone
    } catch (err) {
        return err
    }
}