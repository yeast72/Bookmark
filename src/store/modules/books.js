import axios from 'axios'

const state = {
    books: [{
        _id: 1,
        title: 'Books 1',
        url: 'medium.com',
        completed: false
    }],
    error: ''
};

const getters = {
    allBooks: (state) => state.books
};

const actions = {
    async fetchBooks({
        commit
    }) {
        const respone = await axios.get("http://localhost:3000/books")
        commit('setBooks', respone.data.books)
    },
    async addBook({
        commit
    }, book) {
        const respone = await axios.post("http://localhost:3000/book", {
            book: book
        })
        commit('addBook', respone.data.book)
    },
    async deleteBook({
        commit
    }, bookId) {
        const respone = await axios.delete(`http://localhost:3000/book/${bookId}`)
        if (respone.error) {
            commit('errorHandling', respone.error)
        }
        commit('deleteBook', bookId)
    }
};

const mutations = {
    setBooks: (state, books) => (state.books = books),
    addBook: (state, book) => state.books.unshift(book),
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