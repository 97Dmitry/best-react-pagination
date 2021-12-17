import React, { FC } from "react";

interface IPagination {
  paginationStart: 0 | 1;
  currentIndex: number;
  totalPages: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  isDefaultStyles?: boolean;

  wrapperClass?: string;
  itemListClass?: string;
  itemClass?: string;
  selectedItemClass?: string;
  disableItemClass?: string;

  className?: string;
}

const Pagination: FC<IPagination> = ({
  paginationStart,
  currentIndex,
  totalPages,
  setIndex,
  isDefaultStyles,

  wrapperClass = "",
  itemListClass = "",
  itemClass = "",
  selectedItemClass = "",
  disableItemClass = "",
  className,
}) => {
  console.log(totalPages, currentIndex);
  const countItems = [1, 2, 3, 4];

  enum defaultStylesEnum {
    wrapperClass = "wrapperClass",
    itemListClass = "itemListClass",
    itemClass = "itemClass",
    selectedItemClass = "selectedItemClass",
    disableItemClass = "disableItemClass",
  }

  const defaultStyles: Record<defaultStylesEnum, React.CSSProperties> = {
    wrapperClass: {
      position: "sticky",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      bottom: 0,
    },
    itemListClass: {
      padding: "10px 0",
    },
    itemClass: {
      display: "inline",
      cursor: "pointer",
      padding: "6px 12px",
      borderRadius: "4px",
      margin: "0 2px",
      backgroundColor: "#45c954",
    },
    selectedItemClass: {
      display: "inline",
      cursor: "pointer",
      padding: "6px 12px",
      borderRadius: "4px",
      margin: "0 2px",
      backgroundColor: "#48bbff",
    },
    disableItemClass: {
      display: "inline",
      cursor: "not-allowed",
      padding: "6px 12px",
      borderRadius: "4px",
      margin: "0 2px",
    },
  };

  if (totalPages <= 1) {
    return (
      <div className={wrapperClass} style={isDefaultStyles ? defaultStyles.wrapperClass : undefined}>
        <ul className={itemListClass} style={isDefaultStyles ? defaultStyles.itemListClass : undefined}>
          <li className={disableItemClass} style={isDefaultStyles ? defaultStyles.itemClass : undefined}>{`<<`}</li>
          <li className={disableItemClass} style={isDefaultStyles ? defaultStyles.itemClass : undefined}>{`>>`}</li>
        </ul>
      </div>
    );
  }

  if (totalPages > 1 && totalPages < 4) {
    return (
      <div className={wrapperClass} style={isDefaultStyles ? defaultStyles.wrapperClass : undefined}>
        <ul className={itemListClass} style={isDefaultStyles ? defaultStyles.itemListClass : undefined}>
          {[1, 2, 3].map((el) => {
            const index = paginationStart === 0 ? el - 1 : el;
            if (currentIndex === index) {
              return (
                <li
                  className={selectedItemClass}
                  style={isDefaultStyles ? defaultStyles.selectedItemClass : undefined}
                  key={el}
                >
                  {el}
                </li>
              );
            }
            return (
              <li
                className={selectedItemClass}
                style={isDefaultStyles ? defaultStyles.itemClass : undefined}
                key={el}
                onClick={() => setIndex(index)}
              >
                {el}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (totalPages === 4) {
    return (
      <div className={wrapperClass} style={isDefaultStyles ? defaultStyles.wrapperClass : undefined}>
        <ul className={itemListClass} style={isDefaultStyles ? defaultStyles.itemListClass : undefined}>
          {currentIndex > (paginationStart === 0 ? 0 : 1) ? (
            <li
              className={itemClass}
              style={isDefaultStyles ? defaultStyles.itemClass : undefined}
              onClick={() => setIndex(currentIndex - 1)}
            >{`<<`}</li>
          ) : (
            <li
              className={disableItemClass}
              style={isDefaultStyles ? defaultStyles.disableItemClass : undefined}
            >{`<<`}</li>
          )}
          {countItems.map((el) => {
            const index = paginationStart === 0 ? el - 1 : el;
            if (currentIndex === index) {
              return (
                <li
                  className={selectedItemClass}
                  style={isDefaultStyles ? defaultStyles.selectedItemClass : undefined}
                  key={el}
                >
                  {el}
                </li>
              );
            }
            return (
              <li
                className={selectedItemClass}
                style={isDefaultStyles ? defaultStyles.itemClass : undefined}
                key={el}
                onClick={() => setIndex(index)}
              >
                {el}
              </li>
            );
          })}
          {currentIndex < (paginationStart === 0 ? 3 : 4) ? (
            <li
              className={itemClass}
              style={isDefaultStyles ? defaultStyles.itemClass : undefined}
              onClick={() => setIndex(currentIndex + 1)}
            >{`>>`}</li>
          ) : (
            <li
              className={disableItemClass}
              style={isDefaultStyles ? defaultStyles.disableItemClass : undefined}
            >{`>>`}</li>
          )}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className={wrapperClass && className} style={isDefaultStyles ? defaultStyles.wrapperClass : undefined}>
        <ul className={itemListClass} style={isDefaultStyles ? defaultStyles.itemListClass : undefined}>
          {/*Previous button*/}
          {currentIndex > (paginationStart === 0 ? 0 : 1) ? (
            <li
              style={isDefaultStyles ? defaultStyles.itemClass : undefined}
              onClick={() => setIndex(currentIndex - 1)}
            >{`<<`}</li>
          ) : (
            <li
              className={disableItemClass}
              style={isDefaultStyles ? defaultStyles.disableItemClass : undefined}
            >{`<<`}</li>
          )}
          {/*First page button*/}
          {currentIndex > (paginationStart == 0 ? 2 : 3) ? (
            <li
              className={itemClass}
              style={isDefaultStyles ? defaultStyles.itemClass : undefined}
              onClick={() => setIndex(paginationStart === 0 ? 0 : 1)}
            >{`1`}</li>
          ) : null}

          {currentIndex < (paginationStart === 0 ? 3 : 4)
            ? countItems.map((el) => {
                if (paginationStart === 0 ? currentIndex + 1 === el : currentIndex === el) {
                  return (
                    <li
                      className={selectedItemClass}
                      style={isDefaultStyles ? defaultStyles.selectedItemClass : undefined}
                      key={el}
                    >
                      {el}
                    </li>
                  );
                }
                return (
                  <li
                    className={itemClass}
                    style={isDefaultStyles ? defaultStyles.itemClass : undefined}
                    onClick={() => setIndex(paginationStart === 0 ? el - 1 : el)}
                    key={el}
                  >
                    {el}
                  </li>
                );
              })
            : null}

          {currentIndex > (paginationStart === 0 ? 2 : 3) ? (
            <li
              className={disableItemClass}
              style={isDefaultStyles ? defaultStyles.disableItemClass : undefined}
            >{`...`}</li>
          ) : null}

          {currentIndex > (paginationStart === 0 ? 2 : 3) &&
          (paginationStart === 0 ? currentIndex : currentIndex - 1) < totalPages ? (
            <>
              {currentIndex === (paginationStart === 0 ? totalPages - 2 : totalPages - 1) && (
                <li
                  className={itemClass}
                  style={isDefaultStyles ? defaultStyles.itemClass : undefined}
                  onClick={() => setIndex(paginationStart === 0 ? totalPages - 4 : totalPages - 3)}
                >
                  {totalPages - 3}
                </li>
              )}

              {currentIndex === (paginationStart === 0 ? totalPages - 1 : totalPages) && (
                <>
                  <li
                    className={itemClass}
                    style={isDefaultStyles ? defaultStyles.itemClass : undefined}
                    onClick={() => setIndex(paginationStart === 0 ? totalPages - 4 : totalPages - 3)}
                  >
                    {totalPages - 3}
                  </li>
                  <li
                    className={itemClass}
                    style={isDefaultStyles ? defaultStyles.itemClass : undefined}
                    onClick={() => setIndex(paginationStart === 0 ? totalPages - 3 : totalPages - 2)}
                  >
                    {totalPages - 2}
                  </li>
                </>
              )}

              <li
                className={itemClass}
                style={isDefaultStyles ? defaultStyles.itemClass : undefined}
                onClick={() => setIndex(currentIndex - 1)}
              >
                {paginationStart === 0 ? currentIndex : currentIndex - 1}
              </li>

              <li className={selectedItemClass} style={isDefaultStyles ? defaultStyles.selectedItemClass : undefined}>
                {paginationStart === 0 ? currentIndex + 1 : currentIndex}
              </li>

              {currentIndex < (paginationStart === 0 ? totalPages - 1 : totalPages) ? (
                <li
                  className={itemClass}
                  style={isDefaultStyles ? defaultStyles.itemClass : undefined}
                  onClick={() => setIndex(currentIndex + 1)}
                >
                  {paginationStart === 0 ? currentIndex + 2 : currentIndex + 1}
                </li>
              ) : null}
            </>
          ) : null}

          {currentIndex < (paginationStart === 0 ? totalPages - 3 : totalPages - 2) ? (
            <li
              className={disableItemClass}
              style={isDefaultStyles ? defaultStyles.disableItemClass : undefined}
            >{`...`}</li>
          ) : null}

          {currentIndex < (paginationStart === 0 ? totalPages - 2 : totalPages - 1) ? (
            <li
              className={itemClass}
              style={isDefaultStyles ? defaultStyles.itemClass : undefined}
              onClick={() => setIndex(paginationStart === 0 ? totalPages - 1 : totalPages)}
            >
              {totalPages}
            </li>
          ) : null}

          {(paginationStart === 0 ? currentIndex + 1 : currentIndex) < totalPages ? (
            <li
              className={itemClass}
              style={isDefaultStyles ? defaultStyles.itemClass : undefined}
              onClick={() => setIndex(currentIndex + 1)}
            >{`>>`}</li>
          ) : (
            <li
              className={disableItemClass}
              style={isDefaultStyles ? defaultStyles.disableItemClass : undefined}
            >{`>>`}</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Pagination;
