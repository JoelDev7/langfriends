type Props = {
  text: string;
  click?: () => void;
  styles?: string;
};
export default function FormButton({ text, click, styles }: Props) {
  return (
    <button
      onClick={click}
      className={` bg-primary-light border border-primary-light rounded py-2 cursor-pointer hover:bg-emerald-50 ${styles}`}
    >
      {text}
    </button>
  );
}
