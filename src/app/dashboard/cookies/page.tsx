import { TabCookies } from "@/components";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Cookies Page",
  description: "This contains all the cookies",
};

const tabOptions = [1, 2, 3, 4, 5];

export default async function CookiesPage() {
  const cookieStore = await cookies();
  const selectedTab = cookieStore.get("selectedTab")?.value ?? "1";
  return <TabCookies tabOptions={tabOptions} currentTab={selectedTab} />;
}
