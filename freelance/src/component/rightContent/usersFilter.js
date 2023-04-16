import { useContext } from "react";
import { ScriptsContext } from "../../context/ScriptsContext";

const UsersFilter = ()=>{
    const {userOtherMenu} = useContext(ScriptsContext)
    return (
        <div className="flex basis-1/5">
        <div className="overscroll-none overflow-auto h-screen no-scrollbar fixed">
          {/* User Menu */}
          {/*userOtherMenu.menuItem*/}
          {userOtherMenu.menuItem}
        </div>
      </div>
    )
}
export default UsersFilter;