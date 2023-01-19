import type { TransitionStatus } from "react-transition-group/Transition";

type Props = {
  state?: TransitionStatus;
};

const ReplayFooter: React.FC<Props> = ({ state }) => {
  if (!state) state = "entered";

  return (
    <>
      <div
        className={`absolute bottom-0 left-0 right-0 h-16 bg-neutral-900 flex justify-center items-center bg-opacity-95 gap-x-4 transition-all duration-300 ${
          state === "entered" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-red-600 w-6 h-6 rounded-full animate-pulse" />
        <h1 className="text-white text-2xl font-bold uppercase">Replay</h1>
      </div>
    </>
  );
};

export default ReplayFooter;
