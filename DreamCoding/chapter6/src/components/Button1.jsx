import React from 'react';
import styles from './Button1.module.css';

//@ 6.3 PostCSS

// css를 import해와서 사용하는 경우에 이름이 같은 선택자가 있으면 마지막에 import된 css만 적용된다.
// 따라서 css를 import해오는 경우에는 BEM 방법론을 사용하면서 css 파일의 이름을 다르게 해야한다.
// 그러나 컴포넌트 개수가 많아지고 코드가 길어질수록 css 파일의 이름을 다르게 하는 것이 번거로워진다.
// 이를 해결하기 위한것이 PostCSS!!
// 사용법
//=> 1. css확장자 파일 앞에 module을 붙인다. ex) Button1.module.css
//=> 2. 컴포넌트에서 import 해온다. 이때 import한 이름은 아무거나 작성해도 된다. ex) import styles from './Button1.module.css';
//=> 3. 객체형태로 가져오기 때문에 className을 작성할 때 styles. 과 같이 객체 표기법으로 사용한다. ex) <button className={styles.button}>Button1</button>

export default function Button1() {
  return (
    <>
      {/* <button className='button'>Button1</button> */}
      <button className={styles.button}>Button1</button>
    </>
  );
}

