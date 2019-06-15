import axios from 'axios'
import {
    getUserByName
} from '../../../api/api';

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
    fetchUser: async ({
        commit
    }, username) => {
        // const respone = await getUserByName(username)
        const respone = await axios.get('http://localhost:8000/user/' + username)
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