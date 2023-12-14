import './App.css';
import Button1 from './components/Button1';
import Button2 from './components/Button2';
import StyledComponent from './components/StyledComponent';
import TailwindComponent from './components/TailwindComponent';


export default function App() {
  return (
    <>
      {/* PostCSS */}
      <Button1 />
      <Button2 />
      {/* Styled components */}
      <StyledComponent />
      {/* Tailwind css */}
      <TailwindComponent />
    </>
  );
}







