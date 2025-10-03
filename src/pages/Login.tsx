import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Link,
    type Location,
    useLocation,
    useNavigate,
} from "react-router-dom";
import Advertisement from "../components/Advertisement";
import { type LoginValues, loginSchema } from "../schemas/auth.schema";
import { useAuth } from "../store/auth.store";

export default function Login() {
    const login = useAuth((s) => s.login);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        // example defaults
        defaultValues: { email: "alice@example.com", password: "secret123" },
    });

    const onSubmit = async (data: LoginValues) => {
        try {

            // store.login make POST /api/login with credentials: "include"
            await login({ email: data.email, password: data.password });

            // return to the previous page or to "/"
            const state = location.state as { from?: Location } | null;
            const from = state?.from?.pathname ?? "/";
            const target = from === "/login" || from === "/signup" ? "/" : from;
            navigate(target, { replace: true });

        } catch (e: unknown) {
            // show error text from the backend
            const message =
                e instanceof Error ? e.message : "Invalid email or password";
            setError("password", { message });
        }
    };

    return (
        <section className="mx-auto max-w-[calc(28rem+600px)] px-4 py-10">
            <div className="grid justify-center gap-6 lg:grid-cols-[300px_28rem_300px]">
                <aside className="hidden lg:block">
                    <h3 className="mb-2 text-lg font-semibold">Ad (Adtelligent)</h3>
                    <Advertisement
                        code="login-left-adtelligent"
                        sizes={[[300, 250]]}
                        bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                        timeout={1500}
                        className="mx-auto rounded border shadow-sm"
                    />
                </aside>

                <section className="mx-auto w-full max-w-md">
                    <h1 className="text-2xl font-semibold">Login</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-4 space-y-4"
                        noValidate
                    >
                        <div>
                            <input
                                className="w-full rounded border p-2"
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                {...register("email")}
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                className="w-full rounded border p-2"
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                {...register("password")}
                                disabled={isSubmitting}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
                        >
                            {isSubmitting ? "Signing in..." : "Log in"}
                        </button>
                    </form>

                    <p className="mt-3 text-sm">
                        No account?{" "}
                        <Link to="/signup" className="underline">
                            Sign up
                        </Link>
                    </p>
                </section>

                <aside className="hidden lg:block">
                    <h3 className="mb-2 text-lg font-semibold">Ad (Adtelligent)</h3>
                    <Advertisement
                        code="login-right-adtelligent"
                        sizes={[[300, 250]]}
                        bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                        timeout={1500}
                        className="mx-auto rounded border shadow-sm"
                    />
                </aside>
            </div>
        </section>
    );
}
