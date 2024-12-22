 
 <br/>
<br/>

#  *☞* 　<a href="https://jwitter-app.web.app"> `Jwitter App 바로가기!` </a>　*☜* 
<br/>
<br/>

# *파이어베이스란?*
<details>
<summary>상세보기</summary>
　

백엔드 서버 서비스 혹은 앱 개발 플랫폼 으로 볼 수 있다.
기본적으로 의미하는 바는 애플리케이션을 만들거나, 웹사이트를 만들 때 시간을 절약하는 데 사용할 수 있는 서비스
웹을 포함하여 플러터, 리액트 네이티브, ios, 안드로이드, unity 3D, Unreal Engine 용으로 추측되는 C++ SDK 등 많은 플랫폼을 지원하며,
다양한 플랫폼에서 각각 필요한 많은 서비스를 제공한다.

파이어베이스를 쓰면 안되는 상황
사람들은 보통 파이어베이스 프로토타입 앱 만들때만 좋고 현업에서 쓰기에는 좋지 않다고 한다.
그러나 파이어베이스는 구글의 지원을 받기 때문에 현업에서도 충분히 앱을 성장시킬 수 있을것이다.
하지만 앱이 성장하여 커스텀 해야 하는 상황에서는 좋지 않다.
파이어베이스에는 멋진 서비스들이 많지만 일반적이다. 
즉, 기본적으로 모든 응용프로그램에 사용 될 수 있도록 설계되었다는 소리다.
가능한 많은 사람들이 사용할 수 있도록 설계되었다.
하지만 application이 성장하여 많은 사용자가 생겨 병목 현상이나 특정부분이 느려지면 최적화가 하고 싶은 부분이 생기기 마련이다.
그래서 최적화 하려고 할 때 때로는 파이어베이스가 너무 작아서 커스텀 서버로 전환하고 싶을 수도 있을것이다.
`일단은 파이어베이스 시작을 한 뒤 애플리케이션이 어느정도 성장하고 나면 커스텀 구조의 서버로 옮긴다.`

chanpagne problem
성공했기 때문에 실패하는것을 의미
예를들어 100만명의 사용자가 사용하는 application을 만들었을 때 데이터베이스가 감당하지 못하기 때문에 앱이 느려진다.
백만명의 사용자가 이용하는 앱의 경우 파이어베이스가 감당하지 못해 충돌이 발생할 것이다.

중간 크기의 application까지는 파이어베이스로도 충분하다.
</details>
<br>

# *프로젝트 셋업*
<details>
<summary>상세보기</summary>
　

`vite`    
리액트를 포함한 여러 프론트앤드 앱을 개발하는데 도움을 준다.
go로작성된 esbuilder를 사용해서 Webpack5보다 최대 100배 빠른 빌드속도를 자랑한다.

아래 명령어를 입력하고 Y(es)
```
> npm create vite@latest
```

 - project name : jwitter-app
 - Select a framework : React
 - Select a variant : Rust typescript 컴파일러인 SWC 선택

모든것이 선택되면 프로젝트 디렉토리가 생성된다.     

`명령어를 통해 VScode 실행`
```
> code jwitter-app
```

`추가된 프로젝트의 package를 초기화`   
(노드모듈 다운 등)
```
> npm install
```

`서버 실행`
```
> npm run dev
```

`react-router-dom`
```
> npm i react-router-dom@6.14.2
```
`styled-reset`
```
> npm i styled-reset
```
`styled-components`
```
> npm i styled-components@6.0.7
```
`@types/styled-components`
```
> npm i @types/styled-components -D
```
</details>
<br>

# *Firebase 프로젝트 생성 및 호스팅*
<details>
<summary>상세보기</summary>
<br>

파이어베이스는 구글 서비스중 하나이므로 구글 계정이 있다면 바로 사용이 가능하다.  

1. ### 상단 우측의 `콘솔로 이동` 버튼을 클릭한다.  
2. ### 프로젝트 만들기 버튼을 클릭한다.  
3. ### 프로젝트 이름을 입력한 후 `계속` 버튼을 클릭한다.  
4. ### Firebase 프로젝트를 위한 Google 애널리틱스 OFF 후 `프로젝트 만들기` 버튼 클릭
5. ### 좌측 사이드바 - 빌드 아코디언 - `Hosting` 클릭
6. ### 시작하기 클릭
7. ### Firebase 호스팅 설정 시작
<details>
<summary>Firebase 호스팅 설정</summary>
<br>

a. Firebase CLI 설치  
   - 로컬에서 글로벌로 `npm install -g firebase-tools` 설치  

b. 프로젝트 초기화  
   - 프로젝트에서 firebase 로그인 `firebase login` 명령 실행

   - 프로젝트에서 firebase 초기화 `firebase init` 명령 실행  

      - Y 입력 - Enter
        ```bash
        ? Are you ready to proceed? (Y/n) Y - Yes
        ```

      - SpaceBar - Enter
        ```bash
        ? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
        ( ) Realtime Database: Configure a security rules file for Realtime Database and (optionally) provision default instance
        ( ) Firestore: Configure security rules and indexes files for Firestore
        ( ) Functions: Configure a Cloud Functions directory and its files
        >(*) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
        ( ) Hosting: Set up GitHub Action deploys
        ( ) Storage: Configure a security rules file for Cloud Storage
        ( ) Emulators: Set up local emulators for Firebase products
        (Move up and down to reveal more choices)
        ```
      - 기존 프로젝트 사용 옵션 선택 - Enter
        ``` 
        ?Please select an option
        > Use an existing project
        Create a new project
        Add Firebase to an existing Google Cloud Platform project
        Don't set up a default project
        ```
      - 호스팅 할 firebase 프로젝트 선택 - Enter
        ```
        ? Select a default Firebase project for this directory:
        > jwitter-app (jwitter-app)
        yoohyeok-ff0d0 (yoohyeok)
        ```
      - 웹 배포에 사용할 "공개 디렉토리" 지정 - dist 입력 후 Enter
        ```
        ? What do you want to use as your public directory? dist
        ```
      - SPA 작동을 위한 URL 리다이렉션 설정 여부 - y 입력 후 Enter
        ```
        ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y
        ```
      - GitHub 자동 빌드 배포 여부 - N 입력후 Enter
        ```
        ? Set up automatic builds and deploys with GitHub? (y/N) N
        ```

  - 위 모든 과정이 종료되면 `.firebaserc` `firebase.json` 파일 2개가 새로 생성된다.    
      (configuration 관련 정보가 들어있다.)
  - 빌드 실행 `npm run build` 명령 입력
  
  c. dist 디렉토리 생성 확인 후 `firebase deploy` 명령 입력
  
  d. 빌드 및 배포 연동 script  
  - package.json  
    ```json
    {
      "scripts": {
        /* 생략 */
        "predeploy": "npm run build",
        "deploy": "firebase deploy"
        /* 생략 */
      },
    }
    ```
    ```bash
    npm run deploye
    ```
</details>

8. ### `콘솔로 이동` 클릭 후 도메인 확인
</details>
<br>

# *Firebase 프로젝트 & 회원가입/로그인 (일반/깃허브 OAuth 소셜)*
<a href="https://u-it.tistory.com/518"> ▶ 블로그 포스팅 </a>

# *Firebase Cloud Firestore 및 Storage - nosql CRUD 및 Security설정*
<a href="https://u-it.tistory.com/519"> ▶ 블로그 포스팅 </a>

