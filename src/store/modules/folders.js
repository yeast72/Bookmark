import folders from '../../data/folders'
import Vue from 'vue'
import {
    getFolders,
    updateFolder,
    createFolder
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
        const respone = await createFolder(folder)
        dispatch('createFolder', respone.data.folder)
        commit('addFolder', {
            folder: respone.data.folder,
            parentId: parentId
        })
    },
    addBookmarkToFolder: async ({
        commit,
        dispatch
    }, {
        bookmark,
        folderId
    }) => {
        const respone = await createBookmark(bookmark)
        const newBookmark = respone.data.bookmark
        dispatch('createBookmark', {
            bookmark: newBookmark
        })
        commit('addBookmarkToFolder', {
            bookmark: newBookmark,
            folderId
        })
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
    }, folder) => {
        await updateFolder(folder)
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
}

export default {
    state,
    getters,
    actions,
    mutations
}