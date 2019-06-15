import folders from '../../data/folders'
import Vue from 'vue'
import {
    getFolders
} from '../../../api/api';

const state = {
    folders
};

const getters = {
    getFolderById: (state) => (folderId) => (state.folders[folderId]),
    getAllFolders: (state) => state.folders,
}

const actions = {
    fetchFolders: async ({
        commit
    }) => {
        const respone = await getFolders()
        commit('setFolders', respone)
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
        commit('addFolder', {
            folderId,
            parentId
        })
    },
    async addBookmarkToFolder({
        commit
    }, {
        bookmarkId,
        folderId
    }) {
        commit('addBookmarkToFolder', {
            bookmarkId,
            folderId
        })
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
    },
    async removeBookmarkChild({
        commit
    }, {
        folderId,
        bookmarkId
    }) {
        commit('removeBookmarkChild', {
            folderId,
            bookmarkId
        })
    }

}

const mutations = {

    setFolders: (state, folders) => (state.folders = folders),
    createFolder: (state, newFolder) => {
        const index = newFolder._id
        Vue.set(state.folders, index, newFolder)
    },
    removeBookmarkChild: (state, {
        folderId,
        bookmarkId
    }) => {
        const newBookmarksId = state.folders[folderId].bookmarksId.filter(id => id.toString() !== bookmarkId.toString())
        state.folders[folderId] = {
            ...state.folders[folderId],
            bookmarksId: newBookmarksId
        }
    },
    addFolder: (state, {
        folderId,
        parentId
    }) => {
        state.folders[parentId].childFolderId.push(folderId)
    },
    addBookmarkToFolder: (state, {
        bookmarkId,
        folderId
    }) => {
        state.folders[folderId].bookmarksId.push(bookmarkId)
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