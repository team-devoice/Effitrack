import Organization from "./Organization"
import Footer from "../Footer"
import Navbar from "../Dashboard/Navbar"


const Settings = () =>{
    return(
        <>
        <div className="overflow-hidden lg:h-full h-[100vh]">
          <div className="overflow-hidden h-full dark:bg-[#333] bg-[#e1e1e1] p-3 pb-0 ">
            <div className="overflow-y-auto w-full h-full no-scrollbar flex flex-col justify-between">
              <div>
                <Navbar
                  className=""
                  title={"Settings"}
                />
                <div>
                  <Organization/>
                </div>
              </div>
              <footer>
                <Footer />
              </footer>
            </div>
          </div>
        </div>
        </>
    )
}

export default Settings;