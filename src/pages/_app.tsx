import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import MainLayout from "../layouts/MainLayout";

const MyApp: AppType = ({ Component, pageProps }) => (
  <MainLayout>
    <Component {...pageProps} />
  </MainLayout>
);

export default trpc.withTRPC(MyApp);
