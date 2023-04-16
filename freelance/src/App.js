import HomePage from "./component/homePage";
import ApiContextProvider from "./context/ApiContext";
import ScriptsContextProvider from "./context/ScriptsContext";
import OpenHideMenusProvider from "./context/openHideMenus";
export default function App() {
  return (
    <ApiContextProvider>
      <ScriptsContextProvider>
        <OpenHideMenusProvider>
          <HomePage />
        </OpenHideMenusProvider>
      </ScriptsContextProvider>
    </ApiContextProvider>
  );
}
