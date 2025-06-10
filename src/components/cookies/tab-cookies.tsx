"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  setCookie,
} from 'cookies-next/client';

interface TabCookiesProps {
  currentTab?: string;
  tabOptions?: number[];
}

export function TabCookies({
  currentTab = "1",
  tabOptions = [1, 2, 3, 4],
}: TabCookiesProps) {
  return (
    <Tabs
      defaultValue={currentTab}
      onValueChange={(value: string) => setCookie("selectedTab", value)}
    >
      <TabsList>
        {tabOptions.map((tab) => (
          <TabsTrigger key={tab} value={`${tab}`} className="px-10">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="one">Make changes to your account here.</TabsContent>
    </Tabs>
  );
}
