"use server";

import Card from "@/components/Card";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { getServiceListName } from "@/lib/actions";
import EmployeeServiceContent from "@/components/EmployeeServiceContent";

export default async function EmployeeService() {
  const serviceList = await getServiceListName();

  return (
    <>
      <BreadcrumbsComponent dir={["Service"]} />
      <div className="mt-5 w-full h-full overflow-hidden pb-10">
        {serviceList ? (
          <EmployeeServiceContent serviceList={serviceList} />
        ) : (
          <Card className="w-full flex item-center justify-center p-10 text-xl text-neutral-600">
            <h1>The Parking Lot recently provide no service!</h1>
          </Card>
        )}
      </div>
    </>
  );
}
