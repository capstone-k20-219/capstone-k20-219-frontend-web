"use server";

import Card from "@/components/Card";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { getServiceListName } from "@/lib/actions";
import EmployeeServiceContent from "@/components/EmployeeServiceContent";
import { unstable_noStore } from "next/cache";
import { PageContentCotainer3 } from "@/components/ContainerUI";

export default async function EmployeeService() {
  unstable_noStore();
  const serviceList = await getServiceListName();

  return (
    <>
      <BreadcrumbsComponent dir={["Service"]} />
      {serviceList ? (
        <EmployeeServiceContent serviceList={serviceList} />
      ) : (
        <PageContentCotainer3>
          <Card className="w-full flex item-center justify-center p-10 text-xl text-neutral-600">
            <h1>The Parking Lot recently provide no service!</h1>
          </Card>
        </PageContentCotainer3>
      )}
    </>
  );
}
