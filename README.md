템플릿을 활용한 Vue.js 개발이다.

유튜브의 개발레시피 (https://www.youtube.com/c/%EB%A0%88%EC%8B%9C%ED%94%BC) 강의를 따라 만들었다.

아래는 개발노트


[Vue.js] 템플릿을 활용한 Vue.js 개발 - 1. 개발환경 설정  
1) vue cli로 프로젝트 생성.  
manual -> babel, Router, vuex 선택 -> 모두 enter  

2) 예제용 테마 다운로드
https://colorlib.com/wp/ 페이지의 fashe 테마 사용.  
(테마 경로 - https://colorlib.com/wp/template/fashe/)  
유료화 되었기에 https://github.com/lessipe/vue-fashe/tree/master/public 코드 사용...  

3) 예제용 이미지 다운로드  
https://picsum.photos/ 페이지의 Random 이미지 사용.  
https://picsum.photos/seed/picsum/200/300?random 을 사용.  

4) 테마 적용을 위한 기본 템플릿 정리.  
npm run serve 로 vue 구동 확인. -> http://localhost:8080/ 로 브라우저 접속하여 확인.  
/src/components/HelloWorld.vue 삭제.  
/src/views/About.vue 삭제.  
/src/views/Home.vue는 template>div 및 script>export default만 남김.  
/src/router/index.js 삭제 및 /src/router.js 작성. (기존과 다른 형식의 코드여서 사용해보기로..) (vue-router)  
/src/store/index.js 코드 확인 및 main.js의 router 및 store 코드 정정. (vuex)  
/src/App.vue 의 template>div 만 남기고 style 태그 삭제  

5) 테마 적용  
테마의 css, fonts, images, js, vendor 디렉토리를 /public/ 에 넣는다.  
테마의 index.html 코드를 /public/index.html 에 옮겨넣는다.  
 - css 속성들을 title 아래에 붙여 넣는다. (<!--===~===---> 형태의 주석행들 사이의 코드들.)  
 - js 태그를 body 태그 안쪽 제일 아래에 붙여 넣는다. (<!--===~===---> 형태의 주석행들이 감싸는 코드 ~ <script src="js/main.js"></script>까지.)  
 - 기타 부수적인 태그들도 (Back to top / container Selection1) div.app 태그틀 이후에 넣는다.  
적용한 코드들을 npm run serve(이하 vue 실행) 으로 실행한후 확인한다. (Element 에서 CSS, JS 태그 확인 / Console 에서 Error 없음 확인)  

6) 레이아웃 생성 - Header  
/src/components/Header.vue 생성.  
기본 코드 작성.  

```
<template>
</template>

<script>
export default {
    
}
</script>
```

테마 index.html의 header 태그를 template 태그 안에 붙여 넣음.  

7) 레이아웃 생성 - Header  
/src/components/Footer.vue 생성.  
기본 코드 작성.  

```
<template>
</template>

<script>
export default {
    
}
</script>
```

테마 index.html의 footer 태그를 template 태그 안에 붙여 넣음.  

8) 추가한 component 적용  
App.vue 의 div에 Header 및 Footer 태그를 추가하고  
script에 Header와 Footer를 import 하고  
export default - components에 Header와 Footer를 추가한다.  
(@ 경로는 Vue cli가 자동으로 /src와 연결해둔 경로이다.)  
vue를 실행하여 브라우저로 접속하여 Header와 Footer를 확인할 수 있다.  






[Vue.js] 템플릿을 활용한 Vue.js 개발 - 2. 템플릿 구조  
1) 우측 상단 Select box 수정  
우클릭 - 검사를 통해 해당 요소의 html 태그를 확인할 수 있다.  
(이하 git에서 가져온 완성 코드이기에 나는 확인 안됨...)  
select2 라는 태그가 확인되며 이는 패키지지로도 존재한다.(search google)  
테마 index.html의 css와 script에도 select2를 확인할 수 있다.  
브라우저의 Console에 select2 js 구문을 입력하는 경우 제대로 적용 되는것을 확인할 수 있다.  
-> 이는 script가 body 태그 어딘가에는 포함되어 있으나  
   브라우저의 경우 div-app이라는 태그 하나만 있는 상태로 받아오게 된다.  


npm run build 명령을 통해서 브라우저가 실제 받게될 html 을 생성.  
/dist/index.html이 실제 브라우저가 받아오게될 html 파일.  
css 코드와 script 사이에 noscript 항목을 발견할 수 있다.  


script load 순서를 보다보면 해결책을 찾을 수 있는데  
vue.js logic이 들어있는 /js/app.~를 확인할 수 있고  
app.vue의 태그들이 load 되기전에 select2가 실행되기 때문에 오류가 난것으로 확인할 수 있다.


select2의 적용 위치를 결정하기 위해서  
Vue.js 공식 홈페이지에서 lifecycle을 확인하면,  

new Vue에서 component를 생성하고  
초록 및 노랑 부분은 Vue.js 내부에서 실행되는 부분이다.  
흰바탕의 붉은 글씨로 표기되는 beforeCreate 와 같은 부분이 실제 개발자가 코드를 심을 수 있는 부분이다.  
(created, mounted, beforeDestroy 부분을 주로 활용)  

*created :instance 가 생성된 다음 바로 호출된다.  
Vue instance 는 생성 되었지만 화면에 그려진 상태가 아니라서 태그에 접근하지는 못하고 data, method 만 사용 가능한 상태이다.  
api 로 data를 가져와서 출력 해야하는 component의 경우 created 에 api 로 data를 가져오는 logic을 넣으면 된다.  

*mounted : 화면에 그려진뒤 호출된다.  
화면에 출력이 되었기 때문에 태그에 접근할 수 있어서 대부분의 작업이 이루어지는 단계이다.  
화면 출력(태그 load) 이후에 작업이 이루어져야 하는 코드의 경우 mounted 에 logic을 넣으면 된다.  

*beforeDestroy : instance 가 제거되기전에 호출된다.  
별도의 event listener를 등록한 경우 이곳에서 제거를 진행하는 logic을 넣으면 된다.  


/public/index.html의 select2 코드를 잘라내서 
App.vue 파일의 mounted 메소드를 만들고 붙여넣는다. 
(mounted의 경우 methods 영역이 아닌 export default 바로 안쪽에 작성한다.)

vue를 실행하여 확인해보면 제대로 적용되었음을 확인할 수 있다.

2) 우측 상단 장바구니 수정
우클릭 - 검사를 통해 해당 요소의 html 태그를 확인할 수 있다.
class="header-icon1 js-show-header-dropdown"을 확인할 수 있다.

header-icon1 으로 코드를 검색해보면 css 적용만 확인된다. (기능과 관련없음 확인)
js-show-header-dropdown 으로 코드를 검색해보면 /public/js/main.js 안의 script 코드를 확인할 수 있다.

main.js 안의 코드를 확인해 보면 화면 load 후에 동작하는 코드들이 여러개 있음을 확인할 수 있다.
이 코드들을 main.js 안에 $.initialize 라는 함수로 묶어서 안에 모두 정의한뒤(옮겨 넣은뒤)
App.js 안에 mounted 부분에 $.initialize();로 호출한다.
vue를 실행하여 동작을 확인할 수 있다.

추가적으로 select2의 코드도 main.js 의 코드와 같은 성격이기에 
main.js의 $.initialize method 안에 select2 코드도 추가한다.
(한 번에 호출하기 위함.)

vue.js 용으로 생성한 템플릿이 아닌경우 이와 같은 script 문제가 많이 발생하는데
해당 태그에 기능을 부여하는 코드를 찾아서 수정하면 된다. (대체로 mounted 태그에 추가.)






[Vue.js] 템플릿을 활용한 Vue.js 개발 - 3. 라우터 적용하기
vue-router 를 활용해서 url에 맞는 component를 Header 와 Footer 사이에 넣어주고
menu url을 수정할 예정.

1) Home 및 shop page 페이지 반영
router.js 파일에 경로마다 보여줄 component 가 정의되어있다.

views 에 Shop.vue 를 추가하고 router.js 에 shop.vue 를 import 하고 경로와 component를 지정한다.
App.vue 에 접속 경로마다 변경될 곳인 <router-view />를 Header와 Footer 사이에 추가한다.

2) Header 내용의 링크 설정
Header.vue 의 코드를 보면 main menu 에서 li>a 에서 링크를 걸고 있고 
sale-noti class 를 통해서 활성화된 menu 를 표시하고 있다.
구조에 맞춰서 link tag 의 출력을 위해서 
vue-router 에서 제공하는 router-link component를 사용한다.

to attribute 에 home 이라는 router 를 지정해주고 tag 로는 링크인 a 태그를 감쌀 li 태그를 지정한다.
url 과 router 에 지정된 home url 이 동일할 경우 sale-noti 라는 class 적용을 위해서 active-class 에 지정해준다.
url matching test 를 더 명확히 하기 위해서 exact 라는 attribute 를 추가해준다. + shop 도 추가.

topbar-social 의 경우 새창에서 열리는 것들이기에 그냥 a tag를 작성한다.






[Vue.js] 템플릿을 활용한 Vue.js 개발 - 4. API 호출해서 배너 출력하기
Ajax를 사용하여 back-end 에서 data 를 받아오는 구현.
실제 서버는 구현하지 않고 /public/api 를 만들어서 가져옴.

1) api data 만들기
/public/api 디렉토리 생성 및 banner.json 생성. + 코드 작성
배너의 이미지는 상기한 사이트의 random 이미지를 가져옴.
http://localhost:8080/api/banner.json 에서 가져온 data 확인 가능.

2) api 코드 구현
data를 Ajax로 가져와서 Vue.js 내부에서 사용할 수 있도록하는 api 코드 구현
/src/api 디렉토리 생성 및 http.js 생성. + 코드 작성

http.js 안에서 사용하는 axios 패키지 설치.
npm install axios --save-dev

현세대에서는 method 와 url 을 사용해서 용도를 구분하는 REST API(RESTful API) 를 사용.
http.js 에서 Http class 는 put 이나 delete 와 같이 구버전 브라우저에서 지원하지 않는 method 는 
hidden input 에 method 를 담아서 POST 로 보내는 방식을 구현하고
Ajax 를 호출시 banner 처리를 한 번에 할 수 있는 기반을 만들기 위한 class 이다.

http.js 의 Http class 내부에는 기존의 baseUrl 과 넘겨받은 url 을 연결해서 
api 서버를 별도로 운영할 경우 해당하는 주소로 바꿔주는 parseUrl 이 선언되어 있다.

넘겨받은 url 을 바탕으로 ajax 를 호출하는 method 를 구현했다.

get/post 는 기존의 axios 에서 제공하는 것을 그대로 사용했고,
update와 destroy 는 php framework 를 사용하는데 
구버전 브라우저에서 지원하지 않는 method 를 위해서 _method 형태로 post 로 넘겨 사용한다.
data['_method'] = 'put / delete'; 부분을 사용하는 back-end framework 에 맞춰서 사용하면 된다.

최종적으로 Http class 를 통해 ajax 를 호출하여 원하는 data 를 사용할 수 있다.

3) banner data 를 가져와서 사용
banner 의 내용을 가져오는 코드를 /api/banner.js 를 생성하여 작성한다.

4) main 화면의 slide banner 구현
/components/SlideBanner.vue 생성 및 기본 component 코드 작성.
테마의 index.html 코드 중에서 Header 다음의 첫 번째 section 으로 나오는 Slide1 class 코드를 가져와서 
SlideBanner.vue 에 붙여넣는다.

api 를 통해서 banner 가 작동되도록 코드 작성
반복문을 사용하여 구현하기 때문에 한부분만 남겨두고 중복되는 부분을 삭제한다.
script 에 import banner.js 를 import 하고
ajax 를 통해서 data(이미지)를 가져와서 사용하는 코드를 작성한다.

배너를 추가하기 위해서 Home.vue에 SlideBanner.vue 를 import 하고
SlideBanner component 를 추가하고 template 에 추가한다.

브라우저에서 Vue 확장 프로그램을 추가하고 App>Home>SlideBanner 를 확인해보면 banner 의 Object를 확인할 수 있다.

SlideBanner.vue 에서 slick1 아래에 v-for 구문을 통한 banner 를 작성하고 기존의 태그를 넣는다.
유동적으로 변하는 구문들을 vue.js 문법으로 작성한다. (각 요소들을 banner.xx 로 호출.)

사진들이 위에서 아래로 쭉 늘어지는 형태를 갖게 되는데 slick 가 적용되지 않았기 때문이다.
/public/js/slick-custom.js 에서 특정 class 를 찾고 적용시키는 형태이기에 작동하지 않았음을 확인할 수 있다.
3개로 나누어진 코드를 각각 하나의 함수로 묶는다.
이때 slickN 을 selecter 로 사용하고 있기 때문에 this 로 변경해준다.

SlideBanner.vue component 에서 banners 배열의 내용이 한 번에 출력된뒤 slick이 적용되어야한다.
component 내부에서 selecter 로 slick1 을 사용해도 되지만 다른 component 에서 slick1 이라는 class 를 사용할 경우를 대비하여
SlideBanner 안에 있는 Element 를 선택하기 위해서 slick1 을 가진 div 태그에 ref attribute로 slick 이라는 이름을 주고
banners 배열에 ajax response data 를 집어넣고 slick 을 적용해준다.

banners 배열에 값을 넣기는 했지만 slick1 을 호출한 시점은 created method 가 끝나지 않아서
화면에 그려지기 전이기 때문에 동작을 하지 않는다.
nextTick 이라는 method 를 사용한다. nextTick 으로 넘긴 익명 함수는 method 실행이 끝나고 화면에 그려준뒤 실행된다.
(:key 오류는 vue2에서는 고유한 key값 입력이 필요했지만 vue3 에서는 자동으로 넣는다고 한다...)






[Vue.js] 템플릿을 활용한 Vue.js 개발 - 5. Vuex
api 로 가져온 data 를 component 에 저장하지 않고 Vuex store 에 저장한 뒤 사용하여 refactoring 하는 작업.
(Vuex 활용을 위한 강의 일뿐. 모든 data 를 vuex 에 refactoring 할 필요는 없다.
data 를 어디에 저장할지는 설계에 따라 달라지므로 적절히 vuex 를 사용하자.)
(ex. 이 예제의 main banner의 경우 한 번 load 하면 변경할 필요가 없기 때문에 component 에 저장해도 상관없다.)

1) SlideBanner 에 저장된 data 를 vuex store 로 옮기기
/src/store/banner/index.js 생성 및 작성.
banner api 를 import 하고 state, mutations, actions 작성.

작성 이후에는 /src/store 의 index.js 에서 banner module 을 import 하고 modules 영역에 추가한다.

2) SlideBanner 의 Vuex 에서 값을 가져오는 코드 작성.
SlideBanner.vue 에서 기존 banner api 를 사용했던 코드를 삭제한뒤 (script created 부분)
banner 모듈의 setMainBanners 라는 action 을 dispatch 하도록 만들어 준다.
여기의 dispatch 는 Promise 객체를 return 하기 때문에 then 을 붙여서 slick 을 적용해준다.

3) banners 배열을 vuex 에서 가져오는 코드 작성.
vuex 에서 mapState 를 import 하고
computed 에 banners 를 vuex 에서 가져오는 코드 작성. 

mapState 의 첫 번째 parameter 를 string 으로 주고 두 번째 parameter 에는 가져올 규칙을 넣는다. 
첫 번째 parameter 로 정한 banner 라는 namespace 안에 있는 값을 가져오게 된다.

여기까지가 SlideBanner 안에 저장했던 banners 를 vuex store 에 올린것이다.
브라우저로 확인해 보면 기능은 동일한데 개발자 도구 - Vue Tab 에서 SlideBanner 안의 값을 Vuex 에서 가져왔음을 확인할 수 있다.
Vuex Tab에서 Vuex 에 어떤 값들이 저장되어 있는지를 확인할 수 있다. 






[Vue.js] 템플릿을 활용한 Vue.js 개발 - 6. 베스트상품 영역 구현하기
상품 표시 영역 만들기. 5개의 상품을 api 로 받아오고 고정 promotion banner 하나 출력한다.

1) Data 정의 
/public/api/best-product.json 을 생성하고 5개의 데이터 작성.

/src/api/product.js 파일 생성 및 http import, best-product를 가져오는 코드 작성.

/src/components/home/BestProductList.vue 생성 및 기본 코드 작성.
테마의 index.html 에서 코드를 확인해보면 div 3개로 BestProduct 가 작성 되어있음을 확인할 수 있다.
해당 section 을 모두 복사하여 BestProductList.vue template 부분에 붙여 넣는다.

data 저장을 위해서 /src/store/product/index.js 생성 및 코드 작성.
getBestProducts 를 api 에서 가져와서 mutation 을 호출하고 state 에 저장하도록 만들어준다. 
(5. Vuex 의 SlideBanner 참고)

/src/store/index.js 에서 /product/index 를 import 하고 modules 에 추가한다.

BestProductList.vue 에서 mapState 를 import 하고
computed 에 mapState 작성하여 bestProducts 값을 vuex 에서 가져와서 products 배열로 사용한다고 정의.
created 에 product 의 setBestProducts action 을 dispatch 해준다.

여기까지가 vuex 의 data 를 가져오는 과정

2) 템플릿 수정
가져온 데이터는 5개이지만 첫 column 에 2개, 두 번째 column 에 2개, 
세 번째 column 에 1개를 나눠서 표현해야하기 때문에 script 영역에서 미리 구분지어 준다.

BestProductList.vue 의 mapState 이후에 각 column 별로 computed method 에서 
가져올 products data 를 각각 구별하여 구현한다.

BestProductList.vue template 에 각 column 별로 코드를 옮겨 넣고 
인자들을 products.xxx 로 수정하여 products 의 data 를 가져온다.
세 번째 template 의 경우 v-for 를 활용할 필요없이 하나의 데이터만 products 에서 가져온다.
(computed method 인 thirdColumn 을 그대로 호출하여 사용한다.)
고정 promotion 은 그대로 사용.

/src/views/Home.vue 에서 /components/home/BestProductList.vue 를 import 하고 
components 에 추가하고 template 에도 추가해준다.

브라우저에서 확인해보면 undefine error 에서 image property 를 읽을수 없다는 에러가 발생하는데
이는 BestProductList.vue 의 각 column을 나눠주는 computed method 에서
api 에서 호출하기전 초기값이 /store/product/index.js 의 bestProducts: [] 와 같이 빈 array 기 때문에 
BestProductList.vue 의 computed method - xxxColumn 에서 slice 하지 못하여 undefine error 가 발생했다고 추측함.
-> 예외처리 작성. 각 column 에서 slice 하기 위한 만큼의 data 가 없으면 빈 array 를 return.

브라우저에서 개발자 모드의 vue - vuex 를 확인해보면 각 상품들의 정보가 잘 올라가 있음을 확인할 수 있다.
(best-product.json 을 잘못 가져와서 안됬었다... json 형식의 키값으로 호출.)






[Vue.js] 템플릿을 활용한 Vue.js 개발 - 7. Featured product 영역 구현하기
Featured products 영역 구현. new sale 붙은 항목, slide 기능. hover 시 장바구니 담는 버튼.

1) featured-product data 입력
/public/api/featured-product.json 생성후 data 입력.

2) featured-product data 를 가져오는 api 구현
/src/api/product.js 에 featured-product.json 의 data 를 가져오는 method 작성.

3) featured-product vuex 코드 추가 
/src/store/product/index.js 에 state, mutations, actions 추가.

4) Featured Products 화면 출력 부분 작성.
/src/components/home/FeaturedProductList.vue 생성.
테마의 index.html 의 Featured Products 관련 부분을 template 에 붙여 넣는다.
script 에 mapState import 및 computed, created 작성.

5) Featured Products 를 메인 화면에 연결.
/src/views/Home.vue 에 FeaturedProductList 를 import, components, template 에 추가.

6) slick2 적용.
FeaturedProductList.vue 의 class="slick2" 에 ref="slick" 적용.
created 추가작성하여 slick2 적용.

7) vuex 에서 가져온 data 로 화면 출력.
중복되는 형태들을 모두 삭제하고 template 로 감싸서 v-for 로 출력.
상품에 맞게 바뀌어야 하는 data 들도 바꾸어준다.

여기까지가 layout 및 vuex 에서 data 를 받아서 출력하는 구문.


Featured Products 에서 add to cart 를 누르면 cart 에 항목이 저장되는 기능 구현 필요.

8) cart 기능 구현
/src/store/cart/index.js 생성 및 코드 작성

9) main index.js 에 cart 추가
/src/store/index.js 에서 cart 를 import, modules 에 추가한다.

10) cart 에 추가하는 기능을 버튼에 연결
FeaturedProductList.vue 의 button 에 @click 으로 addToCart 기능 연결.
addToCart method 추가.

브라우저에서 개발자도구 - vue - vuex 에서 addToCart 를 누르면 상품이 추가되는것을 확인할 수 있다.
추가된 상품과 계산된 총 금액을 Header 에서 가져와서 장바구니에 추가되어 보여지도록 한다.

11) 장바구니 담긴 상품과 총 금액을 vuex에서 받아옴
Header.vue 에서 mapState 와 mapGetters 를 작성한다.
header cart noti 에 해당하는 반복되는 태그를 삭제하고
template 으로 감싸고 v-for 로 반복하여 출력하도록 구현한다.
(모바일 페이지 포함.)

브라우저에서 addToCart 이후 장바구니를 확인하면
정상적으로 상품이 담기고 총 금액이 계산된것을 확인할 수 있다.






[Vue.js] 템플릿을 활용한 Vue.js 개발 - 8. 상품목록 구현하기 (1)
Header 의 shop 을 눌렀을 때 나오는 상품 페이지 구현하기.
큰 배너, 카테고리, 필터, 가격대, 기능 구현 필요.
상품 목록 페이지와 Featured Products 가 동일한 형태이기에 
미리 작업한 코드를 component 로 분리해서 사용할 예정.

1) shop 페이지 기본 틀 구현
테마의 product.html 에서 상단 배너 부분에 해당하는 section 을 
/src/views/shop.vue에 에 넣는다.

2) filter selection 구현
테마의 product.html 에서 filterBar 부분이다.
noUiSlider 가 css 로 선언되어 있지않기 때문에 해당 css 를 /public/index.html 에 추가하고
하단의 noUiSlider 관련 script 도 /public/index.html 에 추가한다.

No ui slider 관련된 script 코드를 component 안에 mounted method 를 만들어서 추가한다.

shop.vue 에 너무 많은 코드가 들어있기에 이를 구분하기 위해서 별도의 component 로 분리하여 구현.

/src/components/shop/PriceFilter.vue 생성 및 코드 작성.
Price Filter 관련 태그를 template 에 넣고 mounted method 를 만들고 script 코드를 넣는다.

shop.vue 에서 PriceFilter.vue 를 import 하고 components 에 추가한다.
PriceFilter 가 있던 자리에는 component 로 추가해 넣는다.

3) categoryfilter 및 colorfilter 구현
/src/components/shop/CategoryFilter.vue 생성 및 코드 작성.
categoryfilter 관련 태그를 template 에 넣는다.
/src/components/shop/ColorFilter.vue 생성 및 코드 작성.
colorfilter 관련 태그를 template 에 넣는다.

shop.vue 에 CategoryFilter 와 ColorFilter import 하고 components 에 넣는다.
CategoryFilter 와 ColorFilter 각각을 template 위치에 작성한다.
shop 페이지 배너 아래의 select box 는 좌측의 filter 와 기능이 겹치기 때문에 삭제한다.

브라우저에서 확인하면 좌측 메뉴의 기능이 모두 동작하는것을 확인할 수 있다.

4) 미리 만들어 두었던 상품 박스 분리
미리 만들어 놓은 상품 박스 (Featured Products 에 있던.)의 component 를 분리한다. 
/src/components/product.vue 를 생성하고 FeaturedProductList.vue 에 구현해 두었던
상품 출력 관련코드 (template slick2~block2) 를 product.vue 에 붙여 넣는다.
template 안에 있는 값들을 외부에서 받아 올 수 있도록 props 에 product 를 등록한다.

FeaturedProductList.vue 의 addToCart method 를 product.vue methods 에 넣는다.
FeaturedProductList.vue 에서 product.vue 를 import 하고 components 에 추가한다.
FeaturedProductList.vue 에서 product 태그가 있던 공간에 product component 를 추가한다.

브라우저에서 확인해보면 component 로 분리 되었지만 Featured Product 가 정상적으로 출력되는것을 확인할 수 있다.

5) 상품 목록 구현
/src/components/shop/ProductList.vue 생성 및 기본 코드 작성.
api 로 data 를 가져오게 구현.
/public/api/products.json 생성 및 데이터 작성. (products 라는 항목안에 작성.)

/src/api/products.js 에 상품 데이터를 가져오는 코드를 작성.

/src/store/product/index.js 에 products, totalProducts state 작성.
mutation 및 actions 작성.

/src/components/shop/ProductList.vue 에 created method 작성.

Shop.vue 에 ProductList 를 import 하고 components 를 추가한다.
template 의 ProductList 부분을 잘라내고 component 를 사용하도록 코드를 수정한다.
잘라냈던 ProductList 부분 코드는 ProductList.vue 의 template 에 붙여넣는다.

브라우저에서 FeaturedProduct 처럼 상품이 출력됨을 확인할 수 있다.
Vue - Vuex 탭에서 12 개의 products 배열과 totalProducts 24 개를 확인할 수 있다.

ProductList.vue 에서 mapState 를 import 및 작성하여 상품정보를 받아오게 한다.
Product component 를 import 및 components 에 추가한다.
반복되는 구문을 v-for 로 구현한다.

브라우저에서 사진까지 잘 출력되는것을 확인할 수 있다.
addToCart 를 통해서도 장바구니 기능이 잘 동작하는것을 확인할 수 있다.
(addToCart 기능 재사용을 위해서 기존 FeaturedProduct 를 사용한듯 하다.)

6) 상품목록 상단과 하단의 상품 총 갯수와 page 구현.
parameter 를 back-end 로 구현해야 하기 때문에 /src/api/product.js 에서 
getProducts method 의 parameter 로 기본 값을 1 로 갖는 page 를 추가한다.

/src/store/product/index.js 에서 page state 와 mutations 를 추가하고 
setProducts actions 에 page parameter 를 추가한다.
(page parameter 에 따라서 setProducts 호출이 바뀌고 출력되는 상품도 바뀌어야 하지만 
아직은 back-end logic 미구현 상태이므로 페이지 전화에 따라 상품이 바뀌지 않는다.)

Shop.vue 에서 mapState 를 import 하고 computed 로 화면에 출력하기 위한 데이터를 가져온뒤
현재보고 있는 상품의 인덱스와 총 상품수를 표시하고 (showing ~)
상품목록 페이지 버튼을 구현한다.
(총 상품 갯수를 12 개로 나눈 값만큼으로 상품을 나누고 현재 page 에 표시를 하도록 changePage method 구현.)

브라우저에서 확인해 보면 상품 count, 상품 목록, 페이지 이동 기능이 동작하는것을 확인할 수 있다.
(페이지에 따른 상품 출력 변경은 앞서 말한것처럼 아직이다.)
network 탭에서 ajax query 가 정상적으로 동작하는 것을 확인할 수 있다. (page parameter 변화.)
page 값에 따른 return 값을 다르게하는 back-end logic 을 통해 페이지 이동에 따른 상품 출력 변경을 할 수 있을것임.






[Vue.js] 템플릿을 활용한 Vue.js 개발 - 9. 상품목록 구현하기(2)
filtering option 구현.
vuex store 에 filtering option 에 맞는 상품만 가져오는 getter 를 만들어서 상품 list 를 가져오거나
(ajax code 는 최소화하여 효율적. filtering 한 상품 목록이 12개 단위가 되어야하기 때문에 구현이 복잡할 수 있다.)
filtering option 을 변경할때마다 선택할 option 정보를 가지고 새로운 상품 list 를 back-end 에서 가져오는 방법이 있다.
(보통 상품 목록을 가져오는것이 효율적이다.)
두 번째 방법을 사용할 예정.

이 프로젝트는 back-end logic 미구현으로 filtering 을 해도 상품이 같을것이다.
ajax call 에서 parameter 가 제대로 담겨서 나가는지만 확인.

1) 슬라이드 값 확인
/src/components/shop/PriceFilter.vue 에서는 noUiSlider 로 이벤트를 적용하였음. 
(대부분의 템플릿을 만들때는 유명한 패키지를 사용. googling 해서 확인가능.)
'end' 인자를 받아서 가격 슬라이드 값이 받아와지는것을 구현. (console.log 로 values 값을 찍어 보았음.)

2) 받아오는 값을 api 호출시 넘겨주게 구현.
/src/api/product.js 에서 getProducts 에 parameter priceRange 값을 받아오도록 설정.
/src/store/product/index.js 에서도 추가한 parameter priceRange 를 사용할 수 있도록 state 에 추가.
mutations 과 actions 에 priceRange 코드 추가. 
setPriceRange 에서 setProducts 을 호출하기 때문에 priceRange 값을 가져와서 api 를 호출 할 수 있도록 setProducts 를 수정.

PriceFilter.vue 에서 'end' 인자를 받는 구문에 setPriceRange 를 호출하는 구문 작성.

브라우저에서 가격을 변경하거나 페이지를 이동할 때 바뀐 쿼리가 날아가는것을 확인할 수 있다. (api 를 외부 back-end 와 붙여주면 될듯?)






[Vue.js] 템플릿을 활용한 Vue.js 개발 - 10. 장바구니 구현하기
페이지의 Features 를 누르면 장바구니 페이지가 열리는 것을 구현.

1) 기본 틀 작성
/src/views/Features.vue 파일 생성
테마의 cart.html 의 상단 배너에 해당하는 부분을 template 에 작성.
테마의 cart.html 장바구니 리스트에 해당하는 부분을 template 에 작성.
(coupon 기능은 back-end 가 필요하므로 제외, update cart 는 장바구니를 비우는 버튼으로 활용.)
coupon 관련 태그는 모두 삭제.

2) 상품 목록에 대한 태그를 분리
/src/components/features/CartList.vue 파일 생성.
Features.vue 의 상품 목록 관련 코드를 잘라내어 붙여넣는다.
Features.vue 에 CartList 를 import 하고 components 에 추가한다.

CartList.vue 에 mapState 를 추가하고 
computed 에 장바구니에 담긴 상품을 가져오는 구문을 작성한다.

CartList.vue 에 상품을 출력하는 태그를 작성한다. (v-for cartItems)

router.js 파일에 Features component 의 path 를 지정한다.

Header.vue 파일에서 메뉴부분에서 features 로 이동하는 router-link 구문 작성. 

브라우저에서 상품을 카드에 담고 Features 페이지에서 상품을 확인할 수 있다.

3) Features 페이지에서 상품의 이미지를 클릭하면 삭제되는 method 작성
기존 데이터는 상품을 구분하는 고유 id 가 없기때문에 
/public/api/featured-product.json 에 id 값을 추가해준다.

브라우저로 장바구니에 상품을 추가한 후 vue - vuex 에서 additem 시 고유 id 값이 추가되는것을 확인할 수 있다.

/src/store/cart/index.js 의 mutations 과 actions 에 delItem 을 추가.

CartList.vue 파일에서 상품 이미지 클릭 이벤트인 delItem 을 추가, methods 에 추가.

브라우저에서 장바구니에 상품을 추가하고 Features 페이지에서 이미지를 누르면 장바구니에서 항목이 삭제되는 것을 확인할 수 있다.

4) 장바구니의 수량 조절 기능 구현 1
/src/store/cart/index.js 에서 addItem 을 수정한다.
장바구니에 id 값이 같은 상품이 있는지를 확인하여 상품을 추가하거나 주문 수량을 늘리는 선택적인 기능을 구현.
totalPrice 또한 상품 수량을 곱하는 연산을 추가하여 상품 수량에 따른 총금액을 계산하도록 수정.

totalQty 라는 상품의 총 갯수를 출력하는 getter 작성.
Header.vue 에서 computed 에 totalQty 를 추가.
header-wrapicon2 부분의 수량 출력 구문을 cartItems.length 를 totalCartQty 로 수정한다.

브라우저에서 상품을 중복으로 추가하는 경우 우측상단의 장바구니 및 Features 탭에서 확인시 정상적으로 추가되는것을 확인할 수 있다.

5) 장바구니의 수량 조절 기능 구현 2
/src/store/cart/index.js 에서 changeQty 구문을 mutations 와 actions 에 추가한다.
qty 를 증가 및 감소 시키는 actions 를 구현.
CartList.vue 에서 + 및 - 버튼에 increase 및 decrease methods 를 추가 및 구현한다.
:value="item.qty" 구문으로 상품의 개수를 나타내도록 수정.

브라우저에서 확인시 +, - 버튼을 통한 수량조절이 잘 동작하는것을 확인할 수 있다.

(* update cart 의 경우 사용자가 수정한 수량을 back-end 에 update 하는 버튼인데
기존 api 를 만들었던것처럼 api 디렉토리 아래에 ajax 를 호출하는 코드를 추가하고 
버튼 클릭시 api 를 호출하도록 구현하거나

update cart 버튼을 따로 만들 필요없이 vuex cart module 에 있는 increaseQty 나 decreaseQty actions 에 
api 를 호출하는 코드를 추가하는 방법도 있다. )

6) update cart 버튼을 clear cart 버튼으로 수정하여 기능 구현
/src/store/cart/index.js 에서 clearCart mutations 및 actions 를 추가한다.
Features.vue 에서 update cart 버튼을 clear cart 버튼으로 바꾸고 click 이벤트로 clearCart 를 호출한다.

브라우저에서 확인시 정상적으로 장바구니가 비워지는것을 확인할 수 있다.


// views 에는 페이지의 큰 틀이 작성된다.
