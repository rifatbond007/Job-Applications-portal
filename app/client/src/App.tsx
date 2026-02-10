import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./comoponents/ui/sonner";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}