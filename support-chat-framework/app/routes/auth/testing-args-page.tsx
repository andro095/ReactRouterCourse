import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import type { Route } from "./+types/testing-args-page"
import { sleep } from "~/lib/sleep"

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { id, name, age } = params;

    console.log(id, name, age, "from server loader");
    await sleep(1500);

    console.log("Hello, world from the server loader!")
    return { message: "Hello, world from the server loader!" }
}

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
    const { id, name, age } = params;

    console.log(id, name, age, "from client loader");
    await sleep(1500)
    // const serverData = await serverLoader()
    console.log("Hello, world from the client loader!")
    return {
        message: "Hello, world from the client loader!",
    }
}

clientLoader.hydrate = true as const;

export const HydrateFallback = () => {
    console.log("HydrateFallback is rendering from testing args page")
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading page"
            tabIndex={0}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 text-slate-100 backdrop-blur-md"
        >
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="animate-pulse text-lg font-medium tracking-wide text-slate-200">
                    Loading Game...
                </p>
            </div>
        </div>
    )
}

export default function TestingArgsPage({
    loaderData,
    actionData,
    params,
    matches,
}: Route.ComponentProps) {
    // const [isHydrated, setIsHydrated] = useState(false)

    // useEffect(() => {
    //     setIsHydrated(true)
    // }, [])

    const { id, name, age } = params;

    console.log(id, name, age)

    return (
        <div className="p-4 space-y-2">
            <h1 className="font-bold text-4xl">Name: {name}</h1>
            <h1 className="font-bold text-3xl">ID: {id}</h1>
            <h1 className="font-bold text-2xl">Age: {age}</h1>
            <p>Loader Data: {JSON.stringify(loaderData)}</p>
            <p>Action Data: {JSON.stringify(actionData)}</p>
            <p>Route Parameters: {JSON.stringify(params)}</p>
            <p suppressHydrationWarning>
                Matched Routes: {JSON.stringify(matches)}
            </p>
            {/* <p suppressHydrationWarning>
                Matched Routes: {isHydrated ? JSON.stringify(matches) : "Loading..."}
            </p> */}
            <Link to="/auth/testing" className="text-blue-500 underline text-2xl">
                Back to Testing
            </Link>
        </div>
    )
}
