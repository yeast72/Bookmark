import folders from '../../data/folders'
import Vue from 'vue'
import {
    getFolders,
    updateFolder,
    createFolder,
    deleteFolder
} from '../../../api/folder_api'
import {
    createBookmark
} from '../../../api/bookmark_api';

const state = {
    folders
};

const getters = {
    getFolderById: (state) => (folderId) => (state.folders[folderId]),
    getAllFolders: (state) => state.folders,
    getParentFolderById: (state) => (folderId) => {
        return Object.keys(state.folders).find(folder => {
            return state.folders[folder].childFolderId.find(id => id.toString() === folderId.toString())
        })
    }
}

const actions = {
    fetchFolders: async ({
        commit
    }) => {
        const folders = {}
        const respone = await getFolders()
        respone.data.folders.forEach(folder => {
            folders[folder._id] = folder
        })
        commit('setFolders', folders)
    },

    createFolder: async ({
        commit
    }, folder) => {
        commit('createFolder', folder)
    },

    addFolder: async ({
        commit,
        dispatch
    }, {
        folder,
        parentId
    }) => {
        try {
            const respone = await createFolder(folder)
            dispatch('createFolder', respone.data.folder)
            commit('addFolder', {
                folder: respone.data.folder,
                parentId: parentId
            })
        } catch (err) {
            dispatch('createFolder', folder)
            commit('addFolder', {
                folder: folder,
                parentId: parentId
            })
        }

    },
    addBookmarkToFolder: async ({
        commit,
        dispatch
    }, {
        bookmark,
        folderId
    }) => {
        try {
            const respone = await createBookmark(bookmark)
            const newBookmark = respone.data.bookmark
            dispatch('createBookmark', {
                bookmark: newBookmark
            })
            commit('addBookmarkToFolder', {
                bookmark: newBookmark,
                folderId
            })
        } catch (err) {
            dispatch('createBookmark', {
                bookmark: bookmark
            })
            commit('addBookmarkToFolder', {
                bookmark: bookmark,
                folderId
            })
        }

    },
    deleteBookmarkInFolder: async ({
        commit
    }, {
        folderId,
        bookId
    }) => {
        commit('deleteBookmarkInFolder', {
            folderId,
            bookId
        })
    },
    removeBookmarkChild: async ({
        commit
    }, {
        folderId,
        bookmarkId
    }) => {
        commit('removeBookmarkChild', {
            folderId,
            bookmarkId
        })
    },
    updateFolder: async ({
        commit
    }, {
        folderId,
        folder
    }) => {
        await updateFolder(folderId, folder)
        commit('updateFolder', {
            folderId,
            folder
        })
    },
    deleteFolder: async ({
        commit
    }, folderId) => {
        commit('deleteFolder', folderId)
    }
}

const mutations = {

    setFolders(state, folders) {
        state.folders = folders
    },
    createFolder(state, newFolder) {
        const index = newFolder._id
        Vue.set(state.folders, index, newFolder)
    },
    removeBookmarkChild(state, {
        folderId,
        bookmarkId
    }) {
        const newBookmarksId = state.folders[folderId].bookmarksId.filter(id => id.toString() !== bookmarkId.toString())
        state.folders[folderId] = {
            ...state.folders[folderId],
            bookmarksId: newBookmarksId
        }
    },
    addFolder(state, {
        folder,
        parentId
    }) {
        state.folders[parentId].childFolderId.push(folder._id)
    },
    addBookmarkToFolder(state, {
        bookmark,
        folderId
    }) {
        state.folders[folderId].bookmarksId.push(bookmark._id)
    },
    deleteBookmarkInFolder(state, {
        folderId,
        bookId
    }) {
        const index = state.folders.findIndex(folder => folder._id === folderId)
        if (index !== -1) {
            state.folders[index].bookmarks = state.folders[index].bookmarks.filter(bookmark => {
                return bookmark._id.toString() !== bookId.toString()
            })
        }
    },
    updateFolder(state, {
        folderId,
        folder
    }) {
        state.folders[folderId] = folder
    },
    deleteFolder(state, folderId) {
        const parentFolder = Object.keys(state.folders).find(folder => {
            return state.folders[folder].childFolderId.find(id => id.toString() === folderId.toString())
        })
        state.folders[parentFolder].childFolderId = state.folders[parentFolder].childFolderId.filter(id => id.toString() !== folderId.toString())
        delete state.folders[folderId]
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}