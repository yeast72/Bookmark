import {
    getUserByName
} from '../../../api/folder_api';

const state = {
    user: {
        usrename: "",
        rootFolderId: "",
    }
};

const getters = {
    getRootFolderId: (state) => state.user.rootFolderId,
    getUser: (state) => state.user
}

const actions = {
    async fetchUser({
        commit
    }, username) {
        const respone = await getUserByName(username)
        commit('setUser', respone.data.user[0])
    },

}

const mutations = {
    setUser: (state, user) => (state.user = user),
}

export default {
    state,
    getters,
    actions,
    mutations
}