import React from "react";
import AuthLayout from "../component/AuthLayout";
import Input from "../../../components/Input";
import useAuth from "../hooks/useAuth";
import Button from "../../../components/Button";
import { Link, useNavigate } from "react-router";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { errors, handleSubmit, onLoginSubmit, register } = useAuth();
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to your account"
      subtitle="Enter your details to pick up where you left off."
    >
      <form
        onSubmit={handleSubmit(onLoginSubmit)}
        className="space-y-5"
        noValidate
      >
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: { value: EMAIL_PATTERN, message: "Enter a valid email" },
          })}
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
            })}
          />
          <div className="mt-2 flex justify-end">
            <a
              href="#"
              className="text-[13px] font-medium text-emerald-700 hover:text-emerald-900"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <Button type="submit">Log in</Button>

        <p className="text-center text-[14px] text-stone-500">
          New here?{" "}
          <Link
            to={'/register'}
            className="font-semibold text-emerald-700 hover:text-emerald-900"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
