import Link from "next/link";
import { FaHome, FaInfoCircle, FaCoffee , FaUser, FaClipboardList, FaShoppingCart} from "react-icons/fa";
import HeroBanner from "./mainpage/banner";
import ContentSection from "./mainpage/store";

export default function Home() {
  return (
    <>

    <HeroBanner />
    <ContentSection />
      
    </>
  );
}
