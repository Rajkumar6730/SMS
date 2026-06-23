const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination">
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)} disabled={p === currentPage}>
          {p}
        </button>
      ))}
    </div>
  );
};
export default Pagination;