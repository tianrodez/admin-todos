"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export default function TopbarBreadcrumb() {
  const pathname = usePathname();
  const breadCrumbItems = pathname.split("/").slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbItems.map((link, index) => {
          const isLastItem = breadCrumbItems.length === index + 1;
          
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage>{link}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={`/${link}`}>{link}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
