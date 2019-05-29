import axios from 'axios'

const state = {
    folders: [{
        id: 1,
        name: 'Web dev folder',
        createAt: '12312312',
        updateAt: '123123123',
        bookmarks: []
    }]
};

const getters = {
    allFolders: (state) => state.folders
}

const actions = {
    async fetchFolders({
        commit
    }) {
        const respone = await axios.get("http://localhost:8000")
        commit('setFolders', respone.data.folders)
    }
}

const mutations = {
    setFolders: (state, folders) => (state.folders = folders)
}

export default {
    state,
    getters,
    actions,
    mutations
}