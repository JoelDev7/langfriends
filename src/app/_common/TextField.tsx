type Props = {
  id: string;
  fieldName: string;
  rhf: any;
  rhfErrors: any;
};
export default function TextField({ fieldName, id, rhf, rhfErrors }: Props) {
  return (
    <>
      <label htmlFor={id}>{fieldName}</label>
      <textarea
        {...rhf}
        id={id}
        className="border-gray-500 px-2 py-1 border rounded min-h-20"
        aria-invalid={rhfErrors[id] ? "true" : "false"}
      ></textarea>
    </>
  );
}
