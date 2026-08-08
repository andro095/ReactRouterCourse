import type { Route } from "./+types/home";
import { Navigate, redirect } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return redirect('/chat');
}

export default function Home() {
  return <Navigate to="/chat" />;

  // return (
  //   <div>
  //     <h1 className="text-4xl font-thin">Welcome to the app</h1>
  //     <p>Please select a chat</p>
  //   </div>
  // );
}
