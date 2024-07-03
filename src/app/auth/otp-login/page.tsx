"use client"

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { otpLoginAction } from "@/actions/users";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function OTPLogin() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  
  const handleOtpSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const session = await otpLoginAction(formData);
      if (session) {
        toast.success("One time login code successfull!");
        router.push("/update-password");
      } else {
        toast.error('One time login code failed, please try again.');
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form action={handleOtpSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Verify OTP</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Enter your email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            disabled={isPending}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="token" className="block text-gray-700 mb-2">
            Enter one time password:
          </label>
          <input
            id="token"
            name="token"
            type="text"
            placeholder="One time code"
            required
            disabled={isPending}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          disabled={isPending}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Verify"}
        </button>
      </form>
    </div>
  );
}

