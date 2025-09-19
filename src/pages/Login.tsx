import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Link,
  type Location,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
    // defaultValues: { email: "alice@example.com", password: "secret123" },
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      await Promise.resolve(login(data));
      const state = location.state as { from?: Location } | null;
      const from = state?.from?.pathname ?? "/";
      const target = from === "/login" || from === "/signup" ? "/" : from;
      navigate(target, { replace: true });
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Invalid email or password";
      setError("password", { message });
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
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
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <button
          // className="rounded px-4 py-2 text-white"
          type="submit"
          disabled={isSubmitting}
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
    </main>
  );
}
