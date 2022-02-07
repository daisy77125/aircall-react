import React from "react";

const PaginationBar = ({ totalPageCount, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="position-absolute mb-3 bottom-0 start-50 translate-middle-x">
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => {
          let listClass = "page-item";
          if (number === currentPage) {
            listClass += " active";
          }

          return (
            <li key={number} className={listClass}>
              <a
                onClick={() => paginate(number)}
                href="#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PaginationBar;
