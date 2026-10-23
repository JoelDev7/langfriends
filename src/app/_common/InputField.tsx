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
      <label className="mt-4 text-sm text-emerald-600" htmlFor={id}>
        {fieldName}
      </label>
      <input
        {...rhf}
        readOnly={readOnly}
        className="border-gray-500 px-2 py-1 border-b "
        id={id}
        type={type}
        aria-invalid={rhfErrors[id] ? "true" : "false"}
      />
    </>
  );
}
