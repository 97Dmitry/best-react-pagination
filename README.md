# best-react-pagination

[![NPM](https://nodei.co/npm/best-react-pagination.png?downloads=true)](https://nodei.co/npm/best-react-pagination/)

**Simple and stylized react component to render a pagination.**

## Installation

```
npm install best-react-pagination --save
```

```javascript
import Pagination from "best-react-pagination";

const YourComponent: FC = () => {
  const [index, setIndex] = useState(0);

  return (
    // Your code
    <Pagination
      paginationStart={0}
      currentIndex={index}
      setIndex={setIndex}
      totalPages={10}
    />
  );
};
```

## Props

| Name                | Type                                           | Description                                                            |
| ------------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| `paginationStart`   | `Number`                                       | **Required.** The number of start pages on your logic (0 or 1).        |
| `currentIndex`      | `Number`                                       | **Required.** The current index from hook useState of pages displayed. |
| `totalPages`        | `Number`                                       | **Required.** The range of pages displayed.                            |
| `setIndex`          | `React.Dispatch<React.SetStateAction<number>>` | **Required.** The dispatch from hook useState                          |
| `isDefaultStyles`   | `Boolean`                                      | **Default true**                                                       |
| `wrapperClass`      | `String`                                       | Css class                                                              |
| `itemListClass`     | `String`                                       | Css class                                                              |
| `itemClass`         | `String`                                       | Css class                                                              |
| `selectedItemClass` | `String`                                       | Css class                                                              |
| `disableItemClass`  | `String`                                       | Css class                                                              |
| `className`         | `String`                                       | **Field for styled-component**                                         |
