"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false)
  const router = useRouter();
  

  // ---------------- FORM VALIDATION ----------------
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm your password"),
      terms: Yup.boolean().oneOf([true], "You must agree to terms"),
    }),

    onSubmit: (values) => {
      console.log(values);
      setIsSigningUp(true)
      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md shadow-none border-none">
        <CardContent className="px-2 sm:px-0 pt-10">

          {/* ------------ TITLE ------------ */}
          <h1 className="text-4xl font-bold text-gray-900">Sign Up</h1>
          <p className="text-gray-500 mt-2">
            Create your account to get started!
          </p>

          {/* ------------ DIVIDER ------------ */}
          <div className="flex items-center my-5">
          </div>

          {/* ------------ FORM ------------ */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">

            {/* First & Last Name Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-1.5">
                <Label className="text-gray-700">First Name *</Label>
                <Input
                  name="firstName"
                  placeholder="Enter first name"
                  className={`h-12 transition-all ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <CircleAlert size={14} /> {formik.errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <Label className="text-gray-700">Last Name *</Label>
                <Input
                  name="lastName"
                  placeholder="Enter last name"
                  className={`h-12 transition-all ${
                    formik.touched.lastName && formik.errors.lastName
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <CircleAlert size={14} /> {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-gray-700">Email *</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`h-12 transition-all ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
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
                  className={`h-12 pr-12 transition-all ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {formik.touched.password && formik.errors.password && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <CircleAlert size={14} /> {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label className="text-gray-700">Confirm Password *</Label>

              <div className="relative">
                <Input
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  className={`h-12 pr-12 transition-all ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <CircleAlert size={14} /> {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                name="terms"
                checked={formik.values.terms}
                onCheckedChange={(val) => formik.setFieldValue("terms", val)}
              />
              <span className="text-gray-600 text-sm">
                I agree to the{" "}
                <span className="text-blue-600 cursor-pointer">
                  Terms & Conditions
                </span>
              </span>
            </div>

            {formik.touched.terms && formik.errors.terms && (
              <p className="flex items-center gap-1 text-sm text-red-600">
                <CircleAlert size={14} /> {formik.errors.terms}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-md"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Creating..." : "Create Account"}
            </Button>
          </form>

          {/* ------------ FOOTER ------------ */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
