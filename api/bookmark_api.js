import axios from 'axios'
const BOOKMARK_API = 'http://localhost:8000/bookmark/'
const BOOKMARKS_API = 'http://localhost:8000/bookmarks/'

export async function getBookmarks() {
    try {
        const respone = await axios.get(BOOKMARKS_API)
        return respone
    } catch (err) {
        return err
    }
}

export async function createBookmark(bookmark) {
    try {
        const respone = await axios.post(BOOKMARK_API, {
            bookmark: bookmark
        })
        return respone
    } catch (err) {
        return err
    }
}

export async function updateBookmark(bookmarkId, bookmark) {
    try {
        const respone = await axios.put(BOOKMARK_API + `${bookmarkId}`, {
            bookmark: bookmark
        })
        return respone
    } catch (err) {
        return err
    }
}

export async function deleteBookmark(bookmarkId) {
    try {
        const respone = await axios.delete(BOOKMARK_API + `${bookmarkId}`)
        return respone
    } catch (err) {
        return err
    }
}