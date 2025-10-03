import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Advertisement from "../components/Advertisement";
import { type RegisterValues, registerSchema } from "../schemas/auth.schema";
import { useAuth } from "../store/auth.store";

export default function SignUp() {
    const registerUser = useAuth((s) => s.register); // call store
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterValues) => {
        try {
            await registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            // if register → login passed, cookie is set, user in store
            reset();
            navigate("/", { replace: true });
        } catch (e: unknown) {
            const message =
                e instanceof Error ? e.message : "Registration failed. Try another email.";
            // we are showing an error near email
            setError("email", { message });
        }
    };

    return (
        <section className="mx-auto max-w-[calc(28rem+600px)] px-4 py-10">
            <div className="grid gap-6 lg:grid-cols-[300px_28rem_300px] justify-center">
                <aside className="hidden lg:block">
                    <h3 className="text-lg font-semibold mb-2">Ad (Adtelligent)</h3>
                    <Advertisement
                        code="signup-left-adtelligent"
                        sizes={[[300, 250]]}
                        bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                        timeout={1500}
                        className="border rounded shadow-sm mx-auto"
                    />
                </aside>

                <section className="mx-auto w-full max-w-md">
                    <h1 className="text-2xl font-semibold">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
                        <div>
                            <input className="w-full rounded border p-2" placeholder="Name" autoComplete="name" {...register("name")} />
                            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        <div>
                            <input className="w-full rounded border p-2" type="email" placeholder="Email" autoComplete="email" {...register("email")} />
                            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        <div>
                            <input className="w-full rounded border p-2" type="password" placeholder="Password" autoComplete="new-password" {...register("password")} />
                            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                        </div>


                        <div>
                            <input className="w-full rounded border p-2" type="password" placeholder="Confirm password" autoComplete="new-password" {...register("confirmPassword")} />
                            {"confirm" in errors && (
                                <p className="text-sm text-red-600">{(errors as any).confirm?.message}</p>
                            )}
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-60">
                            {isSubmitting ? "Creating..." : "Create account"}
                        </button>
                    </form>

                    <p className="mt-3 text-sm">
                        Already have an account? <Link to="/login" className="underline">Login</Link>
                    </p>
                </section>

                <aside className="hidden lg:block">
                    <h3 className="text-lg font-semibold mb-2">Ad (Adtelligent)</h3>
                    <Advertisement
                        code="signup-right-adtelligent"
                        sizes={[[300, 250]]}
                        bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                        timeout={1500}
                        className="border rounded shadow-sm mx-auto"
                    />
                </aside>
            </div>
        </section>
    );
}
