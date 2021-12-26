import React, { FC } from "react";
import { DefaultStylesEnum, Themes } from "./utils/constants";
import { Item, ItemList, Wrapper } from "./components";
import range from "./utils/range";

interface PaginationProps {
  paginationStart: 0 | 1;
  currentIndex: number;
  totalPages: number;
  setIndex: (newIndex: number) => void;
  isDefaultStyles?: boolean;

  wrapperClass?: string;
  itemListClass?: string;
  itemClass?: string;
  selectedItemClass?: string;
  disableItemClass?: string;

  customLeftArrow?: React.ReactNode;
  customRightArrow?: React.ReactNode;

  theme?: "light" | "dark";

  className?: string;
}

export const ThemeContext = React.createContext<{ theme: Themes }>({ theme: Themes.LIGHT });

const Pagination: FC<PaginationProps> = ({
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

  customLeftArrow = "<",
  customRightArrow = ">",

  theme = "light",

  className,
}) => {
  const _theme = theme === Themes.LIGHT ? Themes.LIGHT : Themes.DARK;

  return (
    <ThemeContext.Provider value={{ theme: _theme }}>
      {totalPages <= 1 && (
        <Wrapper wrapperClass={className ? className : wrapperClass} isDefaultStyles={isDefaultStyles}>
          <ItemList itemListClass={itemListClass} isDefaultStyles={isDefaultStyles}>
            <Item
              itemClass={disableItemClass}
              itemStyle={DefaultStylesEnum.disableItemClass}
              isDefaultStyles={isDefaultStyles}
            >
              {customLeftArrow}
            </Item>

            <Item
              itemClass={disableItemClass}
              itemStyle={DefaultStylesEnum.disableItemClass}
              isDefaultStyles={isDefaultStyles}
            >
              1
            </Item>

            <Item
              itemClass={disableItemClass}
              itemStyle={DefaultStylesEnum.disableItemClass}
              isDefaultStyles={isDefaultStyles}
            >
              {customRightArrow}
            </Item>
          </ItemList>
        </Wrapper>
      )}

      {totalPages > 1 && totalPages < 4 && (
        <Wrapper wrapperClass={className ? className : wrapperClass} isDefaultStyles={isDefaultStyles}>
          <ItemList itemListClass={itemListClass} isDefaultStyles={isDefaultStyles}>
            {range(totalPages).map((el) => {
              const index = paginationStart === 0 ? el : el + 1;
              if (currentIndex === index) {
                return (
                  <Item
                    itemClass={selectedItemClass}
                    itemStyle={DefaultStylesEnum.selectedItemClass}
                    isDefaultStyles={isDefaultStyles}
                    key={el}
                  >
                    {el + 1}
                  </Item>
                );
              }
              return (
                <Item
                  itemClass={selectedItemClass}
                  itemStyle={DefaultStylesEnum.itemClass}
                  isDefaultStyles={isDefaultStyles}
                  onClick={() => setIndex(index)}
                  key={el}
                >
                  {el + 1}
                </Item>
              );
            })}
          </ItemList>
        </Wrapper>
      )}

      {totalPages === 4 && (
        <Wrapper wrapperClass={className ? className : wrapperClass} isDefaultStyles={isDefaultStyles}>
          <ItemList itemListClass={itemListClass} isDefaultStyles={isDefaultStyles}>
            {currentIndex > (paginationStart === 0 ? 0 : 1) ? (
              <Item
                itemClass={itemClass}
                itemStyle={DefaultStylesEnum.itemClass}
                isDefaultStyles={isDefaultStyles}
                onClick={() => setIndex(currentIndex - 1)}
              >
                {customLeftArrow}
              </Item>
            ) : (
              <Item
                itemClass={disableItemClass}
                itemStyle={DefaultStylesEnum.disableItemClass}
                isDefaultStyles={isDefaultStyles}
              >
                {customLeftArrow}
              </Item>
            )}
            {range(totalPages).map((el) => {
              const index = paginationStart === 0 ? el : el + 1;
              if (currentIndex === index) {
                return (
                  <Item
                    itemClass={selectedItemClass}
                    itemStyle={DefaultStylesEnum.selectedItemClass}
                    isDefaultStyles={isDefaultStyles}
                    key={el}
                  >
                    {el + 1}
                  </Item>
                );
              }
              return (
                <Item
                  itemClass={selectedItemClass}
                  itemStyle={DefaultStylesEnum.itemClass}
                  isDefaultStyles={isDefaultStyles}
                  key={el}
                  onClick={() => setIndex(index)}
                >
                  {el + 1}
                </Item>
              );
            })}
            {currentIndex < (paginationStart === 0 ? 3 : 4) ? (
              <Item
                itemClass={itemClass}
                itemStyle={DefaultStylesEnum.itemClass}
                isDefaultStyles={isDefaultStyles}
                onClick={() => setIndex(currentIndex + 1)}
              >
                {customRightArrow}
              </Item>
            ) : (
              <Item
                itemClass={disableItemClass}
                itemStyle={DefaultStylesEnum.disableItemClass}
                isDefaultStyles={isDefaultStyles}
              >
                {customRightArrow}
              </Item>
            )}
          </ItemList>
        </Wrapper>
      )}

      {totalPages > 4 && (
        <Wrapper wrapperClass={className ? className : wrapperClass} isDefaultStyles={isDefaultStyles}>
          <ItemList itemListClass={itemListClass} isDefaultStyles={isDefaultStyles}>
            {/*Previous button*/}
            {currentIndex > (paginationStart === 0 ? 0 : 1) ? (
              <Item
                itemClass={itemClass}
                itemStyle={DefaultStylesEnum.itemClass}
                isDefaultStyles={isDefaultStyles}
                onClick={() => setIndex(currentIndex - 1)}
              >
                {customLeftArrow}
              </Item>
            ) : (
              <Item
                itemClass={disableItemClass}
                itemStyle={DefaultStylesEnum.disableItemClass}
                isDefaultStyles={isDefaultStyles}
              >
                {customLeftArrow}
              </Item>
            )}
            {/*First page button*/}
            {currentIndex > (paginationStart == 0 ? 2 : 3) ? (
              <Item
                itemClass={itemClass}
                itemStyle={DefaultStylesEnum.itemClass}
                isDefaultStyles={isDefaultStyles}
                onClick={() => setIndex(paginationStart === 0 ? 0 : 1)}
              >
                {`1`}
              </Item>
            ) : null}

            {currentIndex < (paginationStart === 0 ? 3 : 4)
              ? range(4).map((el) => {
                  const index = paginationStart === 0 ? el : el + 1;
                  if (currentIndex === index) {
                    return (
                      <Item
                        itemClass={selectedItemClass}
                        itemStyle={DefaultStylesEnum.selectedItemClass}
                        isDefaultStyles={isDefaultStyles}
                        key={el}
                      >
                        {el + 1}
                      </Item>
                    );
                  }
                  return (
                    <Item
                      itemClass={itemClass}
                      itemStyle={DefaultStylesEnum.itemClass}
                      isDefaultStyles={isDefaultStyles}
                      onClick={() => setIndex(index)}
                      key={el}
                    >
                      {el + 1}
                    </Item>
                  );
                })
              : null}

            {currentIndex > (paginationStart === 0 ? 2 : 3) ? (
              <Item
                itemClass={disableItemClass}
                itemStyle={DefaultStylesEnum.disableItemClass}
                isDefaultStyles={isDefaultStyles}
              >
                {`...`}
              </Item>
            ) : null}

            {currentIndex > (paginationStart === 0 ? 2 : 3) &&
            (paginationStart === 0 ? currentIndex : currentIndex - 1) < totalPages ? (
              <>
                {currentIndex === (paginationStart === 0 ? totalPages - 2 : totalPages - 1) && (
                  <Item
                    itemClass={itemClass}
                    itemStyle={DefaultStylesEnum.itemClass}
                    isDefaultStyles={isDefaultStyles}
                    onClick={() => setIndex(paginationStart === 0 ? totalPages - 4 : totalPages - 3)}
                  >
                    {totalPages - 3}
                  </Item>
                )}

                {currentIndex === (paginationStart === 0 ? totalPages - 1 : totalPages) && (
                  <>
                    <Item
                      itemClass={itemClass}
                      itemStyle={DefaultStylesEnum.itemClass}
                      isDefaultStyles={isDefaultStyles}
                      onClick={() => setIndex(paginationStart === 0 ? totalPages - 4 : totalPages - 3)}
                    >
                      {totalPages - 3}
                    </Item>
                    <Item
                      itemClass={itemClass}
                      itemStyle={DefaultStylesEnum.itemClass}
                      isDefaultStyles={isDefaultStyles}
                      onClick={() => setIndex(paginationStart === 0 ? totalPages - 3 : totalPages - 2)}
                    >
                      {totalPages - 2}
                    </Item>
                  </>
                )}

                <Item
                  itemClass={itemClass}
                  itemStyle={DefaultStylesEnum.itemClass}
                  isDefaultStyles={isDefaultStyles}
                  onClick={() => setIndex(currentIndex - 1)}
                >
                  {paginationStart === 0 ? currentIndex : currentIndex - 1}
                </Item>

                <Item
                  itemClass={selectedItemClass}
                  itemStyle={DefaultStylesEnum.selectedItemClass}
                  isDefaultStyles={isDefaultStyles}
                >
                  {paginationStart === 0 ? currentIndex + 1 : currentIndex}
                </Item>

                {currentIndex < (paginationStart === 0 ? totalPages - 1 : totalPages) ? (
                  <Item
                    itemClass={itemClass}
                    itemStyle={DefaultStylesEnum.itemClass}
                    isDefaultStyles={isDefaultStyles}
                    onClick={() => setIndex(currentIndex + 1)}
                  >
                    {paginationStart === 0 ? currentIndex + 2 : currentIndex + 1}
                  </Item>
                ) : null}
              </>
            ) : null}

            {currentIndex < (paginationStart === 0 ? totalPages - 3 : totalPages - 2) ? (
              <Item
                itemClass={disableItemClass}
                itemStyle={DefaultStylesEnum.disableItemClass}
                isDefaultStyles={isDefaultStyles}
              >
                {`...`}
              </Item>
            ) : null}

            {currentIndex < (paginationStart === 0 ? totalPages - 2 : totalPages - 1) ? (
              <Item
                itemClass={itemClass}
                itemStyle={DefaultStylesEnum.itemClass}
                isDefaultStyles={isDefaultStyles}
                onClick={() => setIndex(paginationStart === 0 ? totalPages - 1 : totalPages)}
              >
                {totalPages}
              </Item>
            ) : null}

            {(paginationStart === 0 ? currentIndex + 1 : currentIndex) < totalPages ? (
              <Item
                itemClass={itemClass}
                itemStyle={DefaultStylesEnum.itemClass}
                isDefaultStyles={isDefaultStyles}
                onClick={() => setIndex(currentIndex + 1)}
              >
                {customRightArrow}
              </Item>
            ) : (
              <Item
                itemClass={disableItemClass}
                itemStyle={DefaultStylesEnum.disableItemClass}
                isDefaultStyles={isDefaultStyles}
              >
                {customRightArrow}
              </Item>
            )}
          </ItemList>
        </Wrapper>
      )}
    </ThemeContext.Provider>
  );
};

export default Pagination;
