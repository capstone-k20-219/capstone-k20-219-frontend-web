import { useEffect, useState } from "react";

interface usePaginationProps<T> {
  data: T[] | null;
  pageSize?: number;
}

function usePagination<T>({ data, pageSize }: usePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = pageSize ?? 5;
  const [currentRecords, setCurrentRecords] = useState<T[]>([]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleDecreasePage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const indexOfLastRecord: number = currentPage * recordsPerPage;
    const indexOfFirstRecord: number = indexOfLastRecord - recordsPerPage;
    const tmp = data ? data.slice(indexOfFirstRecord, indexOfLastRecord) : [];
    setCurrentRecords(tmp);
  }, [data, currentPage]);

  return {
    currentPage,
    currentRecords,
    recordsPerPage,
    setCurrentPage,
    handleChangePage,
    handleDecreasePage,
  };
}

export default usePagination;
