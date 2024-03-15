import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import LoadingIcon from "@/components/LoadingIcon";

export default function LoadingEmployeePage() {
  return (
    <>
      <BreadcrumbsComponent />
      <div
        className="mt-5 h-full w-full pb-12 rounded-lg 
      bg-gray-300 opacity-50 flex items-center justify-center"
      >
        <LoadingIcon />
      </div>
    </>
  );
}
