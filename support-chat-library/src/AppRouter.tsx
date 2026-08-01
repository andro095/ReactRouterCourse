import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { AuthLayout } from "./auth/layout/AuthLayout"
import { LoginPage } from "./auth/pages/LoginPage"
import { RegisterPage } from "./auth/pages/RegisterPage"
// import { ChatLayout } from "./chat/layout/ChatLayout"
// import { ChatPage } from "./chat/pages/ChatPage"
import { Loader } from "./components/Loader"
import { sleep } from "./lib/sleep"
import { PrivateRoute } from "./auth/components/PrivateRoute"
import { useQuery } from "@tanstack/react-query"
import { checkAuth } from "./fake/fake-data"


const ChatLayout = lazy(async () => {
    await sleep(1500);

    return import("./chat/layout/ChatLayout");
})

const ChatPage = lazy(() => import("./chat/pages/ChatPage"));

const NoChatSelectedPage = lazy(() => import("./chat/pages/NoChatSelectedPage"));


export const AppRouter = () => {

    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No Token found');
            }

            return checkAuth(token);
        },
        retry: 0
    });

    if (isLoading) {
        return <Loader />;
    }

    // if (isError) {
    //     console.error(error);
    //     return <Navigate to='/auth' replace />;
    // }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>

                <Route path="/chat" element={
                    <Suspense
                        fallback={<Loader />}
                    >
                        <PrivateRoute isAuthenticated={!!user}>
                            <ChatLayout />
                        </PrivateRoute>
                    </Suspense>
                }>
                    <Route index element={<NoChatSelectedPage />} />
                    <Route path=":clientId" element={<ChatPage />} />
                </Route>

                <Route path="/" element={<Navigate to='/auth' />} />

                <Route path="*" element={<Navigate to='/auth' />} />
            </Routes>
        </BrowserRouter>
    )
}