import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, handlePageChange }) {
  return (
    <div className="pagination">
      <div className="pagination-main">
        <button
          className="pagination-content pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button
          className="pagination-content pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <div className="pagination-content pagination-number">
          <span>{currentPage}</span>
        </div>
        <button
          className="pagination-content pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <button
          className="pagination-content pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
