"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, CircleAlert } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginUser } from "@/network/Api"; // ✅ added

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),

    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);

        const res = await loginUser({
          email: values.email,
          password: values.password,
        });

        if (res) {
          localStorage.setItem("access_token", res.data.access_token);

          toast.success("Login successful");
          router.push("/dashboard");
        } else {
          toast.error( "Login failed");
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Invalid email or password"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <Card className="w-full max-w-md shadow-none border-none">
                <CardContent className="px-2 sm:px-0 pt-10">

                    {/* ------------ TITLE ------------ */}
                    <h1 className="text-4xl font-bold text-gray-900">Sign In</h1>
                    <p className="text-gray-500 mt-2">
                        Enter your email and password to sign in!
                    </p>

                    {/* ------------ FORM ------------ */}
                    <form onSubmit={formik.handleSubmit} className="space-y-5 mt-6">

                        {/* Email */}
                        <div className="space-y-1.5">
                            <Label className="text-gray-700">Email *</Label>

                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className={`h-12 transition-all ${formik.touched.email && formik.errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />

                            {/* ERROR MESSAGE */}
                            {formik.touched.email && formik.errors.email && (
                                <p className="flex items-center gap-1 text-sm text-red-600">
                                    <CircleAlert size={14} /> {formik.errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <Label className="text-gray-700">Password *</Label>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className={`h-12 pr-12 transition-all ${formik.touched.password && formik.errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />

                                {/* Eye Icon */}
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* ERROR MESSAGE */}
                            {formik.touched.password && formik.errors.password && (
                                <p className="flex items-center gap-1 text-sm text-red-600">
                                    <CircleAlert size={14} /> {formik.errors.password}
                                </p>
                            )}
                        </div>

                        {/* Keep Me Logged In */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 text-gray-600">
                                <Checkbox
                                    checked={formik.values.remember}
                                    onCheckedChange={(val) =>
                                        formik.setFieldValue("remember", val)
                                    }
                                />
                                Keep me logged in
                            </label>

                            <Link
                                href="/login"
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    {/* ------------ FOOTER ------------ */}
                    <p className="text-center mt-6 text-gray-600">
                        Don’t have an account?{" "}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
