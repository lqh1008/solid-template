
import backgroundImage from "@/images/background-auth.jpg";
import { Component, JSX } from "solid-js";

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

export const SlimLayout: Component<IProps> = ({ children }) => {
  return (
    <>
      <div class="relative flex min-h-full shrink-0 justify-center md:px-12 lg:px-0">
        <div class="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
          <main class="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </main>
        </div>
        <div class="hidden sm:contents lg:relative lg:block lg:flex-1">
          <img
            class="absolute inset-0 h-full w-full object-cover"
            src={backgroundImage}
            alt=""
          />
        </div>
      </div>
    </>
  );
};
