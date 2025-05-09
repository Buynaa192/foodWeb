import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export const PaginationB = () => {
  return (
    <div className=" h-16 flex items-center bg-[#F4F4F5CC]">
      <Pagination className=" flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="bg-white rounded-full hover:bg-[#18181B] hover:text-white"
              href="#"
            />
          </PaginationItem>
          <PaginationItem className="flex gap-2">
            <PaginationLink
              className="bg-white rounded-full hover:bg-[#18181B] hover:text-white"
              href="#"
            >
              1
            </PaginationLink>
            <PaginationLink
              className="bg-white rounded-full hover:bg-[#18181B] hover:text-white"
              href="#"
            >
              2
            </PaginationLink>
            <PaginationLink
              className="bg-white rounded-full hover:bg-[#18181B] hover:text-white"
              href="#"
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="bg-white rounded-full hover:bg-[#18181B] hover:text-white" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="bg-white rounded-full hover:bg-[#18181B] hover:text-white"
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
