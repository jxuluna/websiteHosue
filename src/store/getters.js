const getters = {
    session: state => state.user.session,
    nickname: state => state.user.nickname,
    headimgurl: state => state.user.headimgurl,
    unique_id: state => state.user.unique_id,

}
export default getters
