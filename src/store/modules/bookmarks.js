import bookmarks from '../../data/bookmarks'
import {
    getBookmarks,
} from '../../../api/bookmark_api';

const state = {
    bookmarks
};

const getters = {
    getAllBookmarks: (state) => state.bookmarks,
    getBookmarksLength: (state) => Object.keys(state.bookmarks).length,
    getBookmarkById: (state) => (bookmarkId) => state.bookmarks[bookmarkId]
};

const actions = {
    async fetchBookmarks({
        commit
    }) {
        const bookmarks = {}
        const respone = await getBookmarks()
        respone.data.bookmarks.forEach(bookmark => {
            bookmarks[bookmark._id] = bookmark
        })
        commit('setBookmarks', bookmarks)
    },
    async createBookmark({
        commit
    }, {
        bookmark
    }) {
        commit('createBookmark', bookmark)
    },
    async deleteBookmark({
        commit
    }, bookId) {
        commit('deleteBookmark', bookId)
    },
    async updateBookmark({
        commit
    }, {
        bookmarkId,
        bookmark
    }) {
        commit('updateBookmark', {
            bookmarkId,
            bookmark
        })
    }
};

const mutations = {
    setBookmarks: (state, bookmarks) => (state.bookmarks = bookmarks),
    updateBookmark: (state, {
        bookmarkId,
        bookmark
    }) => {
        state.bookmarks = {
            ...state.bookmarks,
            [bookmarkId]: bookmark
        }
    },
    createBookmark: (state, bookmark) => {
        state.bookmarks = {
            ...state.bookmarks,
            [bookmark._id]: bookmark
        }
    },
    deleteBookmark: (state, bookId) => {
        state.bookmarks[bookId] = undefined
        state.bookmarks = JSON.parse(JSON.stringify(state.bookmarks));
    },
    errorHandling: (state, error) => state.error = error
};

export default {
    state,
    getters,
    actions,
    mutations
}