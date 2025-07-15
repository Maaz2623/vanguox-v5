import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { SyncLoader } from "react-spinners";

const ShimmerMessages = () => {
  // const messages = [
  //   "Thinking...",
  //   "Loading...",
  //   "Analyzing your request...",
  //   "Building your website...",
  //   "Crafting components...",
  //   "Optimising layout...",
  //   "adding final touches",
  //   "Almost ready...",
  // ];

  // const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [messages.length]);

  return (
    <div className="flex items-center justify-center size-10 m-2">
      <SyncLoader className="" size={6} color="#ffff" margin={2} />
    </div>
  );
};

export const MessageGenerating = () => {
  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        className="flex flex-col group px-2 pb-20"
        key="message-generating"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 pl-2 mb-2">
          <Image
            src={`/logo.svg`}
            alt="vibe"
            width={18}
            height={18}
            className="shrink-0"
          />
          <span className="text-sm font-medium">Vanguox</span>
        </div>
        <div className="pl-8.5 flex flex-col gap-y-4">
          <ShimmerMessages />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
