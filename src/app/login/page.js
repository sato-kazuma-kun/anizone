import LoginComponent from "@/components/login/login";
import NotReadyComponent from "@/components/error/non-ready";

export default function LoginPage() {
    let ready = "not-ready";

    return (
        <main>
            {ready === "ready" ? <LoginComponent /> : <NotReadyComponent />}
        </main>
    )
}

