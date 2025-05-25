import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_EMAIL_QUERY} from "@/sanity/lib/queries";



const Navbar = async () => {
    const session = await auth();
    const user = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_EMAIL_QUERY, {
            email: session.user.email,
        });

    return (
        <header className="px-5 py-5 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
               <Link href="/">
                   <Image src="/logo.png" alt="logo" width={144} height={30} />
               </Link>

                <div className="flex justify-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/idea/create">
                                <span>Create</span>
                            </Link>
                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo:"/"});
                            }}>
                                <button type="submit"><span>logout</span></button>
                            </form>
                            <Link href={`/user/${user?._id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ):(
                        // <LoginButton />
                        <form action={async () => {
                            "use server";
                            await signIn('github');
                        }}>
                            <button type="submit">
                                <span>Login</span>
                            </button>
                        </form>
                    )
                    }
                </div>
            </nav>
        </header>
    );
};

export default Navbar;