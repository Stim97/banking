"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from "./Footer"


const MobileNav = ({ user }: MobileNavProps) => {

    const pathname = usePathname();
    return (
        <section className="">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src='/icons/hamburger.svg'
                        width={30}
                        height={30}
                        alt="top menu"
                        className="cursor-pointer"
                    />
                </SheetTrigger>

                <SheetContent className="bg-white border-none w-[300px] ">
                    <SheetTitle></SheetTitle> 
                    <SheetDescription></SheetDescription>
                    <Link href='/' className="flex items-center gap-2 cursor-pointer">
                        <Image
                            src="/icons/logo.svg"
                            width={34}
                            height={34}
                            alt="Horizon logo"
                            // className="size-[24px] max-xl:size-14"
                        />

                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                    </Link>

                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-2 pt-16 text-white">
                                {sidebarLinks.map((item) => {
                                    
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link href={item.route} key={item.label}
                                                className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}>
                                                    <Image
                                                        src={item.imgURL}
                                                        alt={item.label}
                                                        width={20}
                                                        height={20}
                                                        className={cn({
                                                            'brightness-[3] invert-0': isActive
                                                        })}
                                                    />
                                                
                                                <p className={cn("text-16 text-black-2 font-semibold", { "text-white": isActive })}>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                                User
                            </nav>
                        </SheetClose>
                        <Footer user={user} type="mobile"/>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav