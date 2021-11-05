import { Pagination } from 'react-bootstrap';
import usePagination, { DOTS } from '../hooks/usePagination';

const MyPagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const lastPage = paginationRange[paginationRange.length - 1];

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <Pagination className={className}>
      <Pagination.Prev disabled={currentPage === 1} onClick={onPrevious} />

      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <Pagination.Ellipsis />;
        }

        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      })}

      <Pagination.Next disabled={currentPage === lastPage} onClick={onNext} />
    </Pagination>
  );
};

export default MyPagination;
