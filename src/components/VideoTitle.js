import { InfoIcon, PlayIcon } from "lucide-react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black w-screen h-screen object-fill">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4 text-justify">{overview}</p>
      <div className="flex">
        <button className="flex bg-white text-black p-4 px-12 text-xl  rounded hover:opacity-70">
          <PlayIcon fill="black" className="w-8 h-8 " />
          Play
        </button>
        <button className="flex mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded">
          <InfoIcon className="m-auto mr-1" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
