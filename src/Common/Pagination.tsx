
import { Styles } from "./data/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 3) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const pages = getPageNumbers();

    return (
        <Styles>
            <ul className="pagination-box list-unstyled list-inline">
                <li className="list-inline-item">
                    <button onClick={handlePrev} disabled={currentPage === 1}>
                    <i className="bi bi-chevron-double-left"></i>
                    </button>
                </li>

                {pages.map((page, index) => (
                    <li key={index} className={`list-inline-item ${page === currentPage ? "active" : ""}`}>
                        {page === "..." ? (
                            <span className="dots">...</span>
                        ) : (
                            <button onClick={() => onPageChange(page as number)}>{page}</button>
                        )}
                    </li>
                ))}

                <li className="list-inline-item">
                    <button onClick={handleNext} disabled={currentPage === totalPages}>
                    <i className="bi bi-chevron-double-right"></i>
                    </button>
                </li>
            </ul>
        </Styles>
    );
};

export default Pagination;
