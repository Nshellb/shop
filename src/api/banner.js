import http from './http'; // http class를 불러옴.

export default {
    async getMainSlideBanners() { // async는 비동기 함수 선언할때 사용한다. 
        return http.get('api/banner.json'); // back-end에서 data를 가져오는 함수 작성
    }
}