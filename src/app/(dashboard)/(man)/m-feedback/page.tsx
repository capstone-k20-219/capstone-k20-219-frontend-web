import Card from "@/components/Card";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { getServiceListName } from "@/lib/actions";
import { unstable_noStore } from "next/cache";
import ManagerFeedbackContent from "@/components/ManagerFeedbackContent";
import { PageContentCotainer3 } from "@/components/ContainerUI";

export default async function EmployeeService() {
  unstable_noStore();
  const serviceList = await getServiceListName();

  return (
    <>
      <BreadcrumbsComponent dir={["Feedback Management"]} />
      {serviceList ? (
        <ManagerFeedbackContent serviceList={serviceList} />
      ) : (
        <PageContentCotainer3>
          <Card className="w-full flex item-center justify-center p-10 text-xl text-neutral-700">
            <h1>The parking lot recently provide no service!</h1>
          </Card>
        </PageContentCotainer3>
      )}
    </>
  );
}
