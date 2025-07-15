import Image from "next/image";

export const NewMessagesView = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-y-4 -mt-20 text-center justify-center items-center">
        <Image src={`/logo.svg`} alt="logo" width={100} height={100} />
        <h1 className="text-4xl font-semibold">Vanguox AI</h1>
        <p className="text-md text-muted-foreground">
          A powerful AI system designed to enhance ideas and streamline
          creation.
        </p>
      </div>
    </div>
  );
};
