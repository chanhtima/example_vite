import Logo from "../assets/A-Star-Logo.png";
import { Image } from 'primereact/image';
import TopMenu from "./TopMenu";

export default function Navbar() {
    return (
        <div className='globals-padding border-b shadow-md'>
            <nav className="flex justify-between items-center">
                {/* Logo & name web */}
                <a href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="A-Star Logo" width="40" height="40" />
                    <div className="">example</div>
                </a>
                <div className="flex items-center max-lg:flex-row-reverse gap-2">
                    <TopMenu/>
                    <div className="flex items-center gap-2">
                        <div className="max-sm:hidden">Admin@gmail.com</div>
                        <Image src={Logo} alt="A-Star Logo" width="40" height="40" />
                    </div>
                </div>
            </nav>
        </div>
    );
}
