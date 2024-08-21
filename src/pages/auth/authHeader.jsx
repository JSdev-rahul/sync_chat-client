import { victorySvg } from "@/assets";

export const AuthHeader = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold md:text-6xl">WelCome</h1>
        <img className="h-[100px]" alt="victory" loading="lazy" src={victorySvg}></img>
      </div>
      <p className="font-medium text-center">
        Fill in the details to get started with best chat app
      </p>
    </div>
  );
};
