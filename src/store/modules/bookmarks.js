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
    async deleteBook({
        commit
    }, bookId) {
        const respone = await axios.delete(`http://localhost:8000/book/${bookId}`)
        if (respone.error) {
            commit('errorHandling', respone.error)
        }
        commit('deleteBook', bookId)
    }
};

const mutations = {
    createBookmark: (state, bookmark) => {
        Vue.set(state.bookmarks, bookmark._id, bookmark)
    },
    deleteBook: (state, bookId) => state.books = state.books.filter(book => {
        return book._id.toString() !== bookId.toString()
    }),
    errorHandling: (state, error) => state.error = error
};

export default {
    state,
    getters,
    actions,
    mutations
}