import SignUpComponent from '@/components/signup/signup';
import NotReadyComponent from '@/components/error/non-ready';

export default function SignUpPage() {
    let ready = "not-ready";

    return (
        <main>
            {ready === "ready" ? <SignUpComponent /> : <NotReadyComponent />}
        </main>
    );
}
