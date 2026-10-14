import { useState } from "react";

type Props = {
  data: string[];
  query: string;
  setValue: any;
  field: string;
  watch: any;
};
export default function ShowSuggestions({
  data,
  query,
  setValue,
  field,
  watch,
}: Props) {
  const [showList, setShowList] = useState(true);
  let results: string[] = [];
  if (query.length > 0) {
    results = data.filter((element) => {
      return (
        element.toLowerCase().indexOf(query.toLowerCase()) > -1 &&
        element.toLowerCase().indexOf(query.toLowerCase()) < 1
      );
    });
  }
  if (!showList && watch !== results[0]) {
    setShowList(true);
  }
  return (
    <ul className={`${showList ? "" : "hidden"}`}>
      {results.map((result) => {
        return (
          <li
            className="cursor-pointer hover:bg-blue-100 px-2 rounded"
            onClick={() => {
              setValue(field, result);
              setShowList(false);
            }}
            key={result}
          >
            {result}
          </li>
        );
      })}
    </ul>
  );
}
