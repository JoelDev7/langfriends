import { useState } from "react";

type Props = {
  data: string[];
  query: string;
  setValue: any;
  field: string;
};
export default function ShowSuggestions({
  data,
  query,
  setValue,
  field,
}: Props) {
  const [showList, setShowList] = useState(false);
  let results: string[] = [];
  if (query?.length > 0) {
    results = data.filter((element) => {
      return (
        element.toLowerCase().indexOf(query.toLowerCase()) > -1 &&
        element.toLowerCase().indexOf(query.toLowerCase()) < 1
      );
    });
  }
  if (!showList && query !== results[0] && query?.length > 0) {
    setShowList(true);
  }
  return (
    <div className="relative">
      <ul
        className={`${showList && query?.length > 0 ? "" : "hidden"}  bg-white absolute max-h-61 overflow-y-scroll w-full p-1`}
      >
        {results.map((result) => {
          return (
            <li
              className=" cursor-pointer hover:bg-emerald-50 px-2 rounded"
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
    </div>
  );
}
