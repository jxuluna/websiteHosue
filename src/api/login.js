import Axios from 'axios';
import config from '@/config';

const baseUrl = config.USER;
export default {
    //用户信息
    getUserInfo(params) {
        let url = `${baseUrl}/wechat/session/get`;
        return Axios.post(url, params);
    },
   
}
