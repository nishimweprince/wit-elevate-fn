import { testimonyProps } from "../../util/types"
import profile from "../../assets/profile.png"

const Testimony = ({testimony,title,name}:testimonyProps) =>{
    return (
        
        <div className="bg-lightGrey border border-medium rounded-3xl px-6 py-9 flex flex-col gap-4">
          <p className="font-medium text-sm leading-6 text-light">
           {testimony}
          </p>
          <div className="flex gap-3">
            <img src={profile} alt="profile" />
            <div>
              <h3 className="font-semibold text-sm leading-6 text-darkGrey">
              {name}
              </h3>
              <p className="text-xs leading-5">{title}</p>
            </div>
          </div>
        </div> 
     
    )
}
export default Testimony