import UserMenu from "./userMenu";

const RightContent = ()=>{
    return (
        <div className="flex basis-1/5">
        <div className="overscroll-none overflow-auto h-screen no-scrollbar fixed">
          {/* User Menu */}
          {/*userOtherMenu.menuItem*/}
          {<UserMenu />}
        </div>
      </div>
    )
}
export default RightContent;