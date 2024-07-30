import clsx from "clsx";
import { Component, Index, JSX, createSignal } from "solid-js";

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

const pageStyle =
  "flex flex-col center items-center justify-center h-screen w-screen";

const Users: Component<IProps> = ({ children }) => {
  const [isViolet, setIsViolet] = createSignal<boolean>(false);

  // setTimeout(() => {
  //   setIsViolet(!isViolet());
  // }, 10000);

  return (
    <div
      class={clsx(
        pageStyle,
        isViolet() ? "text-violet-500 text-[20px]" : "text-[26px] text-black"
      )}
    >
      <nav>
        <Index each={["introduce", "solar-system"]}>
          {(route, i) => (
            <div class='text-center'>
              <a href={`/${route()}`} class={clsx(`text-violet-${i + 1}00`)}>
                {route()}
              </a>
            </div>
          )}
        </Index>
      </nav>
      <h1>Users Page</h1>
      <p>Welcome to the users page.</p>

      {children}
    </div>
  );
};

export default Users;
