import axios from 'axios'

const state = {
    folders: [{
        _id: 1,
        name: 'Web dev folder',
        createAt: '12312312',
        updateAt: '123123123',
        bookmarks: [{
            _id: 1,
            title: 'Books 1',
            url: 'medium.com',
            completed: false
        }]
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
    },
    async addBookmarkToFolder({
        commit
    }, payload) {
        commit('addBookmarkToFolder', payload)
    },
    async deleteBookmarkInFolder({
        commit
    }, {
        folderId,
        bookId
    }) {
        // const respone = await axios.delete(`http://localhost:8000/book/${bookId}`)
        // if (respone.error) {
        //     commit('errorHandling', respone.error)
        // }
        commit('deleteBookmarkInFolder', {
            folderId,
            bookId
        })
    },

}

const mutations = {
    setFolders: (state, folders) => (state.folders = folders),

    addBookmarkToFolder: (state, {
        folderId,
        book
    }) => {
        const index = state.folders.findIndex(folder => folder._id === folderId)
        if (index !== -1) {
            state.folders[index].bookmarks.push(book)
        }
    },

    deleteBookmarkInFolder: (state, {
        folderId,
        bookId
    }) => {
        const index = state.folders.findIndex(folder => folder._id === folderId)
        if (index !== -1) {
            state.folders[index].bookmarks = state.folders[index].bookmarks.filter(bookmark => {
                return bookmark._id.toString() !== bookId.toString()
            })
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}