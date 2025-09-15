import { createContext, useState ,useEffect,useContext} from "react";
import { COLORS} from "./theme";
import { useColorScheme } from "react-native";



export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [theme,setTheme] = useState(colorScheme === 'dark' ? COLORS.dark : COLORS.light);

  useEffect(()=>{
    setTheme(colorScheme === 'dark' ? COLORS.dark : COLORS.light);
  },[colorScheme]);

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
    
}

export const useTheme = () => {
  return useContext(ThemeContext);
}

