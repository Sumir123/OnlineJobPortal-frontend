import React from "react";

const RenderPaginationButtons = ({ totalPage, currentPage, page, setPage }) => {
  const pagesToShow = 2;
  const buttons = [];

  if (totalPage <= 1) {
    return buttons;
  }

  if (totalPage <= 7) {
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <div
          key={i}
          className={`bg-slate-600 cursor-pointer text-slate-100 px-2 py-0.5 rounded-md ${
            i === currentPage ? "bg-slate-900" : ""
          }`}
          onClick={() => setPage(i)}
        >
          {i}
        </div>
      );
    }
  } else {
    buttons.push(
      <div
        key={1}
        className={`bg-slate-600 cursor-pointer text-slate-100 px-2 py-0.5 rounded-md ${
          1 === currentPage ? "bg-slate-900" : ""
        }`}
        onClick={() => setPage(1)}
      >
        1
      </div>
    );

    if (currentPage - pagesToShow > 2) {
      buttons.push(<div key="start-ellipsis">...</div>);
    }

    for (
      let i = currentPage - pagesToShow;
      i <= currentPage + pagesToShow;
      i++
    ) {
      if (i > 1 && i < totalPage) {
        buttons.push(
          <div
            key={i}
            className={`bg-slate-600 cursor-pointer text-slate-100 px-2 py-0.5 rounded-md ${
              i === currentPage ? "bg-slate-900" : ""
            }`}
            onClick={() => setPage(i)}
          >
            {i}
          </div>
        );
      }
    }

    if (currentPage + pagesToShow < totalPage - 1) {
      buttons.push(<div key="end-ellipsis">...</div>);
    }

    buttons.push(
      <div
        key={totalPage}
        className={`bg-slate-600 cursor-pointer text-slate-100 px-2 py-0.5 rounded-md ${
          totalPage === currentPage ? "bg-slate-900" : ""
        }`}
        onClick={() => setPage(totalPage)}
      >
        {totalPage}
      </div>
    );
  }

  return buttons;
};

export default RenderPaginationButtons;
