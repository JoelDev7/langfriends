import LanguageChatbot from "./_common/LanguageChatbot";

export default function Home() {
  return (
    <div className="flex flex-col justify-end h-full  md:w-1/2 lg:w-1/3 mx-auto">
      <div className="h-15 bg-primary-light flex justify-center items-center font-semibold text-white">
        Practice English with me
      </div>
      <LanguageChatbot />
    </div>
  );
}
