import Image from "next/image";

export const NewMessagesView = () => {
  return (
    <div className="w-full h-[300px] flex flex-col justify-start mt-10 items-center text-center">
      <Image src="/logo.svg" alt="logo" width={100} height={100} priority />
      <h1 className="text-4xl font-semibold mt-4">Vanguox AI</h1>
      <p className="text-md text-muted-foreground mt-2">
        A powerful AI system designed to enhance ideas and streamline creation.
      </p>
    </div>
  );
};
