import { FaSearch } from "react-icons/fa"
import { GoHeartFill } from "react-icons/go";
import { IoDocumentText } from "react-icons/io5";

export default function Page() {
  return (
    <footer>
      <div className="footer_icon">
      <FaSearch size={'20px'}/>
      </div>
      <div className="footer_icon">
      <GoHeartFill size={'20px'}/>
      </div>
      <div className="footer_icon">
      <IoDocumentText size={'20px'}/>
      </div>
      {/* <small>&copy;2024 MoguSearch</small> */}
    </footer>
  )
}
