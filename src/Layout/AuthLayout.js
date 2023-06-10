import Link from "next/link";
import Logo from "../images/favicon2.png";
import Image from "next/image";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="absolute left-12 top-4">
        <Link href="/" passHref>
          <Image className="block h-8 w-auto" src={Logo} alt="Rojgar Logo" />
        </Link>
      </div>
      <div className="">{children}</div>
    </>
  );
};

export default AuthLayout;
