type Props = {
  id: string;
  fieldName: string;
  rhf: any;
  rhfErrors: any;
};
export default function TextField({ fieldName, id, rhf, rhfErrors }: Props) {
  return (
    <>
      <label className="text-sm text-emerald-600" htmlFor={id}>
        {fieldName}
      </label>
      <textarea
        {...rhf}
        id={id}
        className="border-gray-500 px-2 py-1 border-b  min-h-20"
        aria-invalid={rhfErrors[id] ? "true" : "false"}
      ></textarea>
    </>
  );
}
