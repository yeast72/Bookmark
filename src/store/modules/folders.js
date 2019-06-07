import axios from 'axios'
import folders from '../../data/folders'

const findFolderById = (folders, folderId) => {
    let result = ""
    folders.forEach(folder => {
        if (folder._id === folderId) {
            result = folder
            return folder
        } else if (folder.children && folder.children.length && typeof folder.children === "object") {
            result = findFolderById(folder.children, folderId)
        }
    })
    return result
}


const state = {
    folders
};

const getters = {
    allFolders: (state) => state.folders,
    getBookmarksFromFolderId: (state) => (folderId) => {
        return findFolderById(state.folders, folderId).bookmarks
    }
}

const actions = {
    async fetchFolders({
        commit
    }) {
        const respone = await axios.get("http://localhost:8000")
        commit('setFolders', respone.data.folders)
    },
    async addFolder({
        commit
    }, folder) {
        commit('addFolder', folder)
    },
    async addBookmarkToFolder({
        commit
    }, payload) {
        commit('addBookmarkToFolder', payload)
    },
    async deleteBookmarkInFolder({
        commit
    }, {
        folderId,
        bookId
    }) {
        // const respone = await axios.delete(`http://localhost:8000/book/${bookId}`)
        // if (respone.error) {
        //     commit('errorHandling', respone.error)
        // }
        commit('deleteBookmarkInFolder', {
            folderId,
            bookId
        })
    },
    async editBookmarkInFolder({
        commit
    }, {
        folderId,
        updBookmark
    }) {
        commit('editBookmarkInFolder', {
            folderId,
            updBookmark
        })
    }

}

const mutations = {

    setFolders: (state, folders) => (state.folders = folders),
    addFolder: (state, folder) => (state.folders.push(folder)),
    addBookmarkToFolder: (state, {
        folderId,
        book
    }) => {
        const index = state.folders.findIndex(folder => folder._id === folderId)
        if (index !== -1) {
            state.folders[index].bookmarks.push(book)
        }
    },

    deleteBookmarkInFolder: (state, {
        folderId,
        bookId
    }) => {
        const index = state.folders.findIndex(folder => folder._id === folderId)
        if (index !== -1) {
            state.folders[index].bookmarks = state.folders[index].bookmarks.filter(bookmark => {
                return bookmark._id.toString() !== bookId.toString()
            })
        }
    },
    editBookmarkInFolder(state, {
        folderId,
        updBookmark
    }) {
        const folIndex = state.folders.findIndex(folder => folder._id.toString() === folderId.toString())
        if (folIndex !== -1) {
            const bookIndex = state.folders[folIndex].bookmarks.findIndex(bookmark => bookmark._id.toString() === updBookmark._id.toString())
            state.folders[folIndex].bookmarks.splice(bookIndex, 1, updBookmark)
        }


    }
}

export default {
    state,
    getters,
    actions,
    mutations
}