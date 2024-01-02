
### npm 설치방법
---
npm init -y 명령어를 터미널에 입력하면 <br>
package.json이 생성된다.

<br>
<br>

### package.json 내의 내용들
---
`name`: 내 프로젝트의 이름<br>
`verision`: 내 프로젝트의 버전을 명시<br>
`description`: 내 프로젝트에 대한 설명<br>
`main`: 패키지처럼 만들어서 npm에 업로드할 때 필요한 옵션 (웹사이트를 만들 때는 필요x)<br/>
`scripts`: 명령들을 등록해서 손쉽게 사용<br/>
`keywords`: 내 프로젝트의 키워드<br/>
`author`: 내 프로젝트의 소유주<br/>
`license`: 내 프로젝트의 라익센스가 어떻게 되는지<br/>

<br/>
<br/>


### package.json 과 package-lock.json
---
node_modules를 삭제하더라도 package.json에 설치했었던 패키지를 기반으로, <br/>
npm install 혹은 npm i를 통해 모듈들을 다운받을 수 있다.<br/>
즉, 깃허브에는 node_modules를 제외하고 올리더라도, <br/>
다른 사용자가 package.json의 내역을 보고 npm i 명령어를 통해 모듈들(패키지)을 다운받을 수 있는 것!
<br/>
`package-lock.json`은 내가 npm으로 설치한 패키지가 사용하는 또 다른 패키지들을 관리하는 곳이라고 생각하면 되고, <br/>
`packager.json`은 나의 프로젝트를 관리하는 곳이라고 생각하면 된다.

<br/>

package.json 과 package-lock.json은 프로젝트를 관리하면서 절대!!! `삭제되면 안되는 파일들`이다.

<br/>
<br/>
<br/>

### devDependencies 와 dependencies
---
```plaintext
$ npm install ... -D
ex. $ npm install parcel-bundler -D

devDependencies는,
개발용 의존성 패키지를 설치하는 것이다.
즉, 개발용에만 사용되고 웹브라우저에서 동작할때는 필요하지 않은 패키지들을 설치할 때 사용.

--------------------------------------------------------

$ npm install ...
ex. $ npm install lodash

dependencies는,
일반용 의존성 패키지를 설치하는 것이다.
즉, 실제 설치한 패키지가 웹브라우저에서 동작할 때 필요할 때 사용.

다시 말해서 개발할때만 필요하냐 아니면 웹 브라우저에서 동작할때 필요하냐의 차이
```

<br/>
<br/>
