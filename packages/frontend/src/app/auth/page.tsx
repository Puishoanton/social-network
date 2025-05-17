import { Metadata } from "next"
import AuthForm from "./components/Auth-form.component"

export const metadata: Metadata = {
  title: 'Authorization',
}

const Page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <AuthForm isLogin={true} />
    </div>
  )
}

export default Page
