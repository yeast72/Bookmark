import Vuex from 'vuex';
import Vue from 'vue';
import bookmarks from './modules/bookmarks'
import folders from './modules/folders'
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        bookmarks,
        folders,
        user
    }
})