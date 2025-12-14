import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

//چون این پروژه کوچیک هست زیاد لازم نیست ولی نوشتمش

export default function AdminAcces() {

    const router = useRouter()
    const cookies = new Cookies()
    const token = cookies.get("Token")

   if (!token) {
        router.push("/")
   }
}