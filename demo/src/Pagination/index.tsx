import React, { FC } from "react";
import { defaultStylesEnum } from "./components/constants";
import { Item, ItemList, Wrapper } from "./components";
import { range } from "./components/utils";

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

  className?: string;
}

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

  className,
}) => {
  if (totalPages <= 1) {
    return (
      <Wrapper wrapperClass={className ? className : wrapperClass} isDefaultStyles={isDefaultStyles}>
        <ItemList itemListClass={itemListClass} isDefaultStyles={isDefaultStyles}>
          <Item
            itemClass={disableItemClass}
            itemStyle={defaultStylesEnum.disableItemClass}
            isDefaultStyles={isDefaultStyles}
          >
            {customLeftArrow}
          </Item>

          <Item
            itemClass={disableItemClass}
            itemStyle={defaultStylesEnum.disableItemClass}
            isDefaultStyles={isDefaultStyles}
          >
            1
          </Item>

          <Item
            itemClass={disableItemClass}
            itemStyle={defaultStylesEnum.disableItemClass}
            isDefaultStyles={isDefaultStyles}
          >
            {customRightArrow}
          </Item>
        </ItemList>
      </Wrapper>
    );
  }

  if (totalPages > 1 && totalPages < 4) {
    return (
      <Wrapper wrapperClass={className ? className : wrapperClass} isDefaultStyles={isDefaultStyles}>
        <ItemList itemListClass={itemListClass} isDefaultStyles={isDefaultStyles}>
          {range(totalPages).map((el) => {
            const index = paginationStart === 0 ? el : el + 1;
            if (currentIndex === index) {
              return (
                <Item
                  itemClass={selectedItemClass}
                  itemStyle={defaultStylesEnum.selectedItemClass}
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
                itemStyle={defaultStylesEnum.itemClass}
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
    );
  }

  if (totalPages === 4) {
    return (
      <Wrapper wrapperClass={className ? className : wrapperClass} isDefaultStyles={isDefaultStyles}>
        <ItemList itemListClass={itemListClass} isDefaultStyles={isDefaultStyles}>
          {currentIndex > (paginationStart === 0 ? 0 : 1) ? (
            <Item
              itemClass={itemClass}
              itemStyle={defaultStylesEnum.itemClass}
              isDefaultStyles={isDefaultStyles}
              onClick={() => setIndex(currentIndex - 1)}
            >
              {customLeftArrow}
            </Item>
          ) : (
            <Item
              itemClass={disableItemClass}
              itemStyle={defaultStylesEnum.disableItemClass}
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
                  itemStyle={defaultStylesEnum.selectedItemClass}
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
                itemStyle={defaultStylesEnum.itemClass}
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
              itemStyle={defaultStylesEnum.itemClass}
              isDefaultStyles={isDefaultStyles}
              onClick={() => setIndex(currentIndex + 1)}
            >
              {customRightArrow}
            </Item>
          ) : (
            <Item
              itemClass={disableItemClass}
              itemStyle={defaultStylesEnum.disableItemClass}
              isDefaultStyles={isDefaultStyles}
            >
              {customRightArrow}
            </Item>
          )}
        </ItemList>
      </Wrapper>
    );
  }

  return (
    <Wrapper wrapperClass={className ? className : wrapperClass} isDefaultStyles={isDefaultStyles}>
      <ItemList itemListClass={itemListClass} isDefaultStyles={isDefaultStyles}>
        {/*Previous button*/}
        {currentIndex > (paginationStart === 0 ? 0 : 1) ? (
          <Item
            itemClass={itemClass}
            itemStyle={defaultStylesEnum.itemClass}
            isDefaultStyles={isDefaultStyles}
            onClick={() => setIndex(currentIndex - 1)}
          >
            {customLeftArrow}
          </Item>
        ) : (
          <Item
            itemClass={disableItemClass}
            itemStyle={defaultStylesEnum.disableItemClass}
            isDefaultStyles={isDefaultStyles}
          >
            {customLeftArrow}
          </Item>
        )}
        {/*First page button*/}
        {currentIndex > (paginationStart == 0 ? 2 : 3) ? (
          <Item
            itemClass={itemClass}
            itemStyle={defaultStylesEnum.itemClass}
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
                    itemStyle={defaultStylesEnum.selectedItemClass}
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
                  itemStyle={defaultStylesEnum.itemClass}
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
            itemStyle={defaultStylesEnum.disableItemClass}
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
                itemStyle={defaultStylesEnum.itemClass}
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
                  itemStyle={defaultStylesEnum.itemClass}
                  isDefaultStyles={isDefaultStyles}
                  onClick={() => setIndex(paginationStart === 0 ? totalPages - 4 : totalPages - 3)}
                >
                  {totalPages - 3}
                </Item>
                <Item
                  itemClass={itemClass}
                  itemStyle={defaultStylesEnum.itemClass}
                  isDefaultStyles={isDefaultStyles}
                  onClick={() => setIndex(paginationStart === 0 ? totalPages - 3 : totalPages - 2)}
                >
                  {totalPages - 2}
                </Item>
              </>
            )}

            <Item
              itemClass={itemClass}
              itemStyle={defaultStylesEnum.itemClass}
              isDefaultStyles={isDefaultStyles}
              onClick={() => setIndex(currentIndex - 1)}
            >
              {paginationStart === 0 ? currentIndex : currentIndex - 1}
            </Item>

            <Item
              itemClass={selectedItemClass}
              itemStyle={defaultStylesEnum.selectedItemClass}
              isDefaultStyles={isDefaultStyles}
            >
              {paginationStart === 0 ? currentIndex + 1 : currentIndex}
            </Item>

            {currentIndex < (paginationStart === 0 ? totalPages - 1 : totalPages) ? (
              <Item
                itemClass={itemClass}
                itemStyle={defaultStylesEnum.itemClass}
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
            itemStyle={defaultStylesEnum.disableItemClass}
            isDefaultStyles={isDefaultStyles}
          >
            {`...`}
          </Item>
        ) : null}

        {currentIndex < (paginationStart === 0 ? totalPages - 2 : totalPages - 1) ? (
          <Item
            itemClass={itemClass}
            itemStyle={defaultStylesEnum.itemClass}
            isDefaultStyles={isDefaultStyles}
            onClick={() => setIndex(paginationStart === 0 ? totalPages - 1 : totalPages)}
          >
            {totalPages}
          </Item>
        ) : null}

        {(paginationStart === 0 ? currentIndex + 1 : currentIndex) < totalPages ? (
          <Item
            itemClass={itemClass}
            itemStyle={defaultStylesEnum.itemClass}
            isDefaultStyles={isDefaultStyles}
            onClick={() => setIndex(currentIndex + 1)}
          >
            {customRightArrow}
          </Item>
        ) : (
          <Item
            itemClass={disableItemClass}
            itemStyle={defaultStylesEnum.disableItemClass}
            isDefaultStyles={isDefaultStyles}
          >
            {customRightArrow}
          </Item>
        )}
      </ItemList>
    </Wrapper>
  );
};

export default Pagination;
