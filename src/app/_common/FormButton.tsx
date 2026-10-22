type Props = {
  text: string;
  click?: () => void;
};
export default function FormButton({ text, click }: Props) {
  return (
    <button
      onClick={click}
      className="mt-4 bg-primary-light border border-primary-light rounded py-2 cursor-pointer hover:bg-emerald-50"
    >
      {text}
    </button>
  );
}
