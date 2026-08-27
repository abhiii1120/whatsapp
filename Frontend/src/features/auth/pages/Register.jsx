import React from "react";
import AuthLayout from "../component/AuthLayout";
import Input from "../../../components/Input";
import useAuth from "../hooks/useAuth";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const { errors, handleSubmit, onRegisterSubmit, register,watch } =
    useAuth();
  const password = watch("password");

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your account"
      subtitle="Takes less than a minute. No credit card required."
    >
      <form
        onSubmit={handleSubmit(onRegisterSubmit)}
        className="space-y-5"
        noValidate
      >
        <Input
          label="Full name"
          placeholder="Ada Lovelace"
          error={errors.username}
          {...register("username", { required: "username is required" })}
        />

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

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          hint="At least 8 characters, with a number"
          error={errors.password}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "At least 8 characters" },
            pattern: {
              value: /\d/,
              message: "Include at least one number",
            },
          })}
        />

        <Input
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords don't match",
          })}
        />

        <Button type="submit">Create account</Button>

        <p className="text-center text-[14px] text-stone-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => useNavigate("/login")}
            className="font-semibold text-emerald-700 hover:text-emerald-900"
          >
            Log in
          </button>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
