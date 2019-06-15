import axios from 'axios'

const FOLDER_API = 'http://localhost:8000/folder/'
const FOLDERS_API = 'http://localhost:8000/folders/'
const BOOKMARK_API = 'http://localhost:8000/bookmark/'
const BOOKMARKS_API = 'http://localhost:8000/bookmarks/'
const USER_API = 'http://localhost:8000/user/'

export async function getBookmarks() {
    try {
        const bookmarks = {}
        const respone = await axios.get(BOOKMARKS_API)
        respone.data.bookmarks.forEach(bookmark => {
            bookmarks[bookmark._id] = bookmark
        })
        return bookmarks
    } catch (err) {
        return err
    }
}

export async function getFolders() {
    try {
        const folders = {}
        const respone = await axios.get(FOLDERS_API)
        respone.data.folders.forEach(folder => {
            folders[folder._id] = folder
        })
        return folders
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