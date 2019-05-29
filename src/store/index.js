import Vuex from 'vuex';
import Vue from 'vue';
import books from './modules/books'
import folders from './modules/folders'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        books,
        folders
    }
})