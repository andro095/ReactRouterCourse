import { useEffect, useState } from "react"
import { Form, Link, NavLink, useNavigation } from "react-router"
import type { Route } from "./+types/testing-page"
import { sleep } from "~/lib/sleep";

export async function action({ request }: Route.ActionArgs) {

    await sleep(2000);

    const data = await request.formData();
    console.log("Server side action");
    console.log({ data });
    return {
        ok: true,
        data,
        message: "Data was submitted successfully",
    };
}

export async function clientAction({ serverAction, request }: Route.ClientActionArgs) {
    await sleep(1500);
    // can still call the server action if needed
    const formData = await request.clone().formData();
    const allData = Object.fromEntries(formData);
    console.log(allData, "from client action form data")

    const data = await serverAction();

    return {
        ok: true,
        data: allData,
        message: "Data was submitted successfully from client action",
    };
}

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

    const navigation = useNavigation();
    const isPosting = navigation.state === "submitting";

    console.log({ navigation, isPosting })

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

            <Form
                className="mt-2 flex gap-2"
                method="post"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border border-slate-300 rounded px-2 py-1"
                />
                <input
                    type="text"
                    name="age"
                    placeholder="Age"
                    className="border border-slate-300 rounded px-2 py-1"
                />
                <button
                    disabled={isPosting}
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPosting ? "Posting..." : "Submit"}
                </button>
            </Form>
        </div>
    )
}
