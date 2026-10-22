type Props = {
  id: string;
  fieldName: string;
  type: string;
  rhf: any;
  rhfErrors: any;
  readOnly?: boolean;
};
export function InputField({
  id,
  fieldName,
  rhf,
  type,
  rhfErrors,
  readOnly,
}: Props) {
  return (
    <>
      <label className="mt-4" htmlFor={id}>
        {fieldName}
      </label>
      <input
        {...rhf}
        readOnly={readOnly}
        className="border-gray-500 px-2 py-1 border rounded"
        id={id}
        type={type}
        aria-invalid={rhfErrors[id] ? "true" : "false"}
      />
    </>
  );
}
