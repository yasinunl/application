import { createContext, useState } from "react";
export const OpenHideMenus = createContext();
const OpenHideMenusProvider = (props) => {
    const [openHide, setOpenHide] = useState(true);
    const [openHideR, setOpenHideR] = useState(false);
    const changeOpenHide = ()=> {
        setOpenHide(!openHide)
        setOpenHideR(false)
    }
    const changeOpenHideR = ()=> {
        setOpenHideR(!openHideR)
        setOpenHide(true)
    }
    useState(()=>{}, [openHide])
    return (
        <OpenHideMenus.Provider value= {{
            openHide,
            changeOpenHide,
            changeOpenHideR,
            openHideR,
        }}>
            {props.children}
        </OpenHideMenus.Provider>
    )
}
export default OpenHideMenusProvider;