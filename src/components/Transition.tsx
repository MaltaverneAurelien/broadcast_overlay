import transition from "../assets/transition.webm";
import { useEffect, useRef } from "react";

interface Props {
  play: boolean;
}

const Transition: React.FC<Props> = ({ play }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (play === true) ref.current?.play();
  }, [play]);
  return (
    <>
      <video
        id="bgVideo"
        preload="true"
        ref={ref}
        className="absolute z-10"
      >
        <source src={transition} type="video/mp4" />
      </video>
    </>
  );
};

export default Transition;
