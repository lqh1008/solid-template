import { TextField } from "@/components/Fields";
import { SlimLayout } from "@/components/SlimLayout";
import { Component, JSX } from "solid-js";

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

const Login: Component<IProps> = () => {
  return (
    <SlimLayout>
      <div class="flex">
        <a href="/" aria-label="Home">
          {/* <Logo class="h-10 w-auto" /> */}
        </a>
      </div>
      <h2 class="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-sm text-gray-700">
        Don’t have an account?{" "}
        <a
          href="/register"
          class="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </a>{" "}
        for a free trial.
      </p>
      <form action="#" class="mt-10 grid grid-cols-1 gap-y-8">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <div>
          {/* <Button type="submit" variant="solid" color="blue" class="w-full">
            <span>
              Sign in <span aria-hidden="true">&rarr;</span>
            </span>
          </Button> */}
        </div>
      </form>
    </SlimLayout>
  );
};

export default Login;
