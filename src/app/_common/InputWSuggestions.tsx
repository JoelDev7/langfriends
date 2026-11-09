type Props = {
  id: string;
  data: string[];
  fieldName: string;
  rhf: any;
  rhfErrors: any;
};
export default function InputWSuggestions({
  fieldName,
  id,
  data,
  rhf,
  rhfErrors,
}: Props) {
  return (
    <>
      <label className="mt-4 text-sm text-emerald-600" htmlFor={id}>
        {fieldName}
      </label>
      <input
        {...rhf}
        className="border-gray-500 px-2 py-1 border-b "
        id={id}
        aria-invalid={rhfErrors[id] ? "true" : "false"}
        list={id + "List"}
      />
      <datalist id={id + "List"}>
        {data.map((item) => {
          return <option key={item} value={item} />;
        })}
      </datalist>
    </>
  );
}
