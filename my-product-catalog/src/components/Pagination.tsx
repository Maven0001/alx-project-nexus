"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentPage } from "../store/productSlice";
import { motion } from "framer-motion";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.products.currentPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center space-x-2"
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-body font-medium"
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="px-2 text-gray-500 font-body">...</span>
          ) : (
            <button
              onClick={() => handlePageChange(page as number)}
              className={`w-10 h-10 rounded-xl font-body font-medium transition-all transform hover:scale-110 ${
                currentPage === page
                  ? "bg-linear-to-r from-primary-600 to-primary-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-body font-medium"
      >
        Next
      </button>
    </motion.div>
  );
}
