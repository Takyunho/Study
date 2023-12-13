import { createContext, useState } from "react";

// context : 데이터를 담고 있다.
// provider : 데이터를 하위 컴포넌트에 제공하는 역할 (우산이라고 생각)
export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  // provider도 컴포넌트임
  // DarkModeContext에 있는 Provider를 사용하는데, 이것을 외부에서 편하게 쓸 수 있게 해주기 위해서 DarkModeProvider라는 컴포넌트를 만들어서 내보내줌

  // global하게 처리하고 싶은 로직을 여기에 작성한다.
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((mode) => !mode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
