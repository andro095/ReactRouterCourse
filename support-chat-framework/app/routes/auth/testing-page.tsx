import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router"
import type { Route } from "./+types/testing-page"

export const loader = async () => {
    console.log("Hello, world from the server loader!")
    return { message: "Hello, world from the server loader!" }
}

export const clientLoader = async ({ serverLoader }: Route.ClientLoaderArgs) => {
    const serverData = await serverLoader()
    console.log("Hello, world from the client loader!")
    return {
        message: "Hello, world from the client loader!",
        serverData,
    }
}
export function headers() {
    return {
        "X-Stretchy-Pants": "its for fun",
        "Cache-Control": "max-age=300, s-maxage=3600",
    };
}

export function links() {
    return [
        // {
        //     rel: "icon",
        //     href: "/favicon.png",
        //     type: "image/png",
        // },
        // {
        //     rel: "stylesheet",
        //     href: "https://example.com/some/styles.css",
        // },
        // {
        //     rel: "preload",
        //     href: "/images/banner.jpg",
        //     as: "image",
        // },
    ];
}



export default function TestingPage({
    loaderData,
    actionData,
    params,
    matches,
}: Route.ComponentProps) {
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    return (
        <div className="p-4 space-y-2">
            <title>Support Chat</title>
            <meta property="og:title" content="Support Chat" />
            <meta
                name="description"
                content="A simple chat application for customer support."
            />
            <h1 className="font-bold text-2xl">Testing Page</h1>
            <p>Loader Data: {JSON.stringify(loaderData)}</p>
            <p>Action Data: {JSON.stringify(actionData)}</p>
            <p>Route Parameters: {JSON.stringify(params)}</p>
            <p suppressHydrationWarning>
                Matched Routes: {isHydrated ? JSON.stringify(matches) : "Loading..."}
            </p>
            <NavLink
                to="/auth/testing-args/ABC-123/Juan/25"
                className={({ isPending }) =>
                    isPending
                        ? "text-red-500 underline text-2xl"
                        : "text-blue-500 underline text-2xl"
                }
            >
                Testing Args
            </NavLink>
        </div>
    )
}
