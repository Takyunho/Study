import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { DarkModeProvider } from './context/DarkModeContext';

//^ 5.18 다크모드 Context 만들기
// notion 정리

export default function AppTheme() {
  return (
    <DarkModeProvider>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </DarkModeProvider>
  );
}



