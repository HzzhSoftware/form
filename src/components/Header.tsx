import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/auth/Avatar";

export default function Header() {
  return (
    <header className="border-b border-neutral-300 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.svg`}
              alt="KYX"
              width={32}
              height={32}
              className="mx-auto w-auto h-[32px]"
              priority
            />
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex space-x-8">
            <Link href="/form" className="text-primary-500 border-b-2 border-primary-500 pb-2 px-1 text-sm font-medium">
              Forms
            </Link>
          </nav>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <Avatar />
        </div>
      </div>
    </header>
  );
} 