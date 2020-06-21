import api from "../../api/login";



const user = {
    state: {
        session:'59985285f3f229f47cfae3ff1ba98184',
        LoginuserName: '',
        nickname:'登录',
        unique_id:localStorage.getItem('unique_id'),
        headimgurl:''
    },

    mutations: {
        SET_session: (state, session) => {
            state.session = session
            localStorage.setItem('session',session)
        },
        SET_nickname: (state, nickname) => {
            state.nickname = nickname
        },
        SET_headimgurl: (state, headimgurl) => {
            state.headimgurl = headimgurl
        },
        SET_unique_id: (state, unique_id) => {
            state.unique_id = unique_id;
            localStorage.setItem('unique_id',unique_id)
        },
    },

    actions: {
        // 登录
        getUserInfo({commit}, session) {
            return new Promise((resolve, reject) => {
                api.getUserInfo(session).then(response => {
                    const data = response.data;
                    if (data.status === "0") {
                        commit('SET_nickname',data.data.nickname);//保存用户名
                        commit('SET_headimgurl',data.data.headimgurl);//保存头像
                        commit('SET_unique_id',data.data.unique_id);//保存unique_id

                    } 
                    // else if (data.status === "-3"){
                    //     commit('SET_cityName','');
                    //     // commit('SET_avatar','');//保存头像
                    //     commit('SET_unique_id','');
                    // }
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
};

export default user
