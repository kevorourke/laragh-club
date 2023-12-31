"use client";

import Image from "next/image";
import logo from "../../public/laragh.png";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LoginMenuItem from "./LoginMenuItem";

const navigation = [
  { name: "News", href: "/news" },
  { name: "Lotto", href: "/lotto" },
  { name: "About Our Club", href: "/about" },
  { name: "Downloads", href: "/downloads" },
  { name: "Members", href: "/members" },
];

export default function Navbar({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#f06c27] from-10% via-[#f26e29] via-50% to-[#f06c27] to-90% text-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 ">
          <Link href="/" legacyBehavior passHref>
            <div>
              <span className="sr-only">Your Company</span>
              <Image
                className="h-24 w-auto -m-1 p-1 rounded-full bg-white"
                src={logo}
                alt="Laragh Logo"
              />
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 ">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} legacyBehavior passHref>
              <a className="text-sm font-semibold leading-6 text-white hover:text-grey-500">
                {item.name}
              </a>
            </Link>
          ))}
        </div>
        <LoginMenuItem type="desktop" />
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 rounded-full bg-white">
              <span className="sr-only">Your Company</span>
              <Image className="h-8 w-auto" src={logo} alt="Laragh Logo" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <LoginMenuItem type="mobile" />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
