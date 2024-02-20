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
　

# *Firebase 프로젝트 & 회원가입/로그인 (일반/깃허브 OAuth 소셜)*
<a href="https://u-it.tistory.com/518"> > 블로그 포스팅 </a>


