import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { type RegisterValues, registerSchema } from "../schemas/auth.schema";
import { useAuth } from "../store/auth.store";

export default function SignUp() {
  const registerUser = useAuth((s) => s.register);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    try {
      // we form the payload explicitly → without the "unused" confirmPassword
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await Promise.resolve(registerUser(payload));
      navigate("/", { replace: true });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Registration error";
      setError("email", { message });
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 space-y-4"
        noValidate
      >
        <div>
          <input
            className="w-full rounded border p-2"
            placeholder="Name"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
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
            autoComplete="new-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            className="w-full rounded border p-2"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          // className="rounded bg-black px-4 py-2 text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create account"}
        </button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </main>
  );
}
