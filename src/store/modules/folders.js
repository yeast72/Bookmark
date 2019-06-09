import axios from 'axios'
import folders from '../../data/folders'
import Vue from 'vue'



const state = {
    folders
};

const getters = {
    getRootFolder: (state) => state.folders[0],
    getFolderById: (state) => (folderId) => (state.folders[folderId]),
    getAllFolders: (state) => state.folders,
}

const actions = {
    async fetchFolders({
        commit
    }) {
        const respone = await axios.get("http://localhost:8000")
        commit('setFolders', respone.data.folders)
    },
    async createFolder({
        commit
    }, folder) {
        commit('createFolder', folder)
    },
    async addFolder({
        commit
    }, {
        folderId,
        parentId
    }) {
        console.log(folderId + ", " + parentId)
        commit('addFolder', {
            folderId,
            parentId
        })
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
    createFolder: (state, newFolder) => {
        const index = newFolder._id
        Vue.set(state.folders, index, newFolder)
    },
    addFolder: (state, {
        folderId,
        parentId
    }) => {
        console.log(folderId + ", " + parentId)
        state.folders[parentId].childFolderId.push(folderId)
    },
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