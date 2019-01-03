import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        name: '',
        login: false,
        menuItems: [],
    },
    getters: {
        //		获取属性的状态
        name: state => {
            if (sessionStorage.getItem('name')) {
                state.name = sessionStorage.getItem('name')
                    // console.log(state.name)
            }
            return state.name
        },

        qbxx: state => state.menuItems

    },
    mutations: {
        //		改变属性的状态

        //登录获取的name事件
        useStatus(state, user) {
            console.log(user)
            if (user) {
                console.log()
                state.name = user
                state.login = true
                state.nav = true

            } else {
                state.name = null
                state.login = false

            }
        },

        remove_menushuju(state, data) {
            console.log(data)
            state.menuItems.forEach((item, index) => {
                console.log(item, index)
                if (item == data) {

                    state.menuItems.splice(index, 1)
                }
            })
        },

        msg(state, data) {
            // console.log(data)

            state.menuItems = data;
        },

        gengxin(state, data) {
            console.log(state, data, '-----------------------------------')
            state.menuItems.forEach((item, index) => {
                console.log(item, index)
                if (item.index == data.index) {
                    state.menuItems.splice(index, 1, data)

                }
            })

        }



    },
    actions: {
        // 应用mutations
        setUser({ commit }, user) {
            console.log(user)
            commit('useStatus', user)
        },
        qc({ commit }) {
            commit('qc')
        }
    }
})