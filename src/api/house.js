import Axios from 'axios';
import config from '@/config';


const baseUrl = config.APP;


export default {
    //上传房源文件
    getHouseUpload(params) {
        let url = `${baseUrl}/admin/uploadhouse/batch`;
        return Axios.post(url, params, {
            headers: { enctype: "multipart/form-data" }
        });
    },
    //导入房源
    importHouseFile(params) {
        let url = `${baseUrl}/admin/uploadhouse/import`;
        return Axios.post(url, { params: params });
    },
    //房源列表
    getHouseList(params) {
        let url = `${baseUrl}/agent/getSelfImportHouseList`;
        return Axios.get(url, { params: params });
    },
    //房源列表单个详情
    getHouseDetail(params) {
        let url = `${baseUrl}/agent/getSelfImportHouseDetail`;
        return Axios.get(url, { params: params });
    },
    //上传图片
    importHouseImg(params) {
        let url = `${baseUrl}/common/upload`;
        return Axios.post(url, { params: params });
    },
    //头部用户动态数据统计
    getStaticClientNum(params) {
        let url = `${baseUrl}/agent/staticClientNum`;
        return Axios.get(url, { params: params });
    },
    //获取收藏夹列表
    getSelectionCard(params) {
        let url = `${baseUrl}/agent/selectionCard`;
        return Axios.get(url, { params: params });
    },
    //经纪人更新房源接口
    updateHouse(id, params) {
        let url = `${baseUrl}/agent/updateHouse/${id}`;
        return Axios.put(url, params);
    },
    //添加单个房源到多个收藏夹
    selectionHouse(params) {
        let url = `${baseUrl}/agent/selectionHouse`;
        return Axios.post(url, params);
    },
    //客户动态列表
    getuserlist(params) {
        let url = `${baseUrl}/h5/statistics/userlist`;
        return Axios.post(url, params);
    },
    //详细访问
    getuserlistDetail(params) {
        let url = `${baseUrl}/h5/statistics/userlist/detail`;
        return Axios.post(url, params);
    },
    //数据统计客户列表
    getuserAlllist(params) {
        let url = `${baseUrl}/h5/statistics/uservisit/detail`;
        return Axios.post(url, params);
    },
    //经纪人获取留电咨询列表
    clientConsultation(params) {
        let url = `${baseUrl}/agent/clientConsultation`;
        return Axios.get(url, { params: params });
    },
    //经纪人获取留电咨询列表
    getAllhouseOrign(params) {
        let url = `${baseUrl}/agent/getSelfImportNumber`;
        return Axios.get(url, { params: params });
    }
}
