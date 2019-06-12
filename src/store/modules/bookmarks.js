import axios from 'axios'
import Vue from 'vue'
import bookmarks from '../../data/bookmarks'

const state = {
    bookmarks
};

const getters = {
    getAllBookmarks: (state) => state.bookmarks,
    getBookmarksLength: (state) => Object.keys(state.bookmarks).length,
    getBookmarkById: (state) => (bookmarkId) => state.bookmarks[bookmarkId]
};

const actions = {
    async fetchBooks({
        commit
    }) {
        const respone = await axios.get("http://localhost:8000/books")
        commit('setBooks', respone.data.books)
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
        // const respone = await axios.delete(`http://localhost:8000/book/${bookId}`)
        // if (respone.error) {
        //     commit('errorHandling', respone.error)
        // }
        commit('deleteBookmark', bookId)
    },
    async editBookmark({
        commit
    }, {
        bookmarkId,
        bookmark
    }) {
        commit('editBookmark', {
            bookmarkId,
            bookmark
        })
    }
};

const mutations = {
    editBookmark: (state, {
        bookmarkId,
        bookmark
    }) => {
        state.bookmarks = {
            ...state.bookmarks,
            [bookmarkId]: bookmark
        }
    },
    createBookmark: (state, bookmark) => {
        Vue.set(state.bookmarks, bookmark._id, bookmark)
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