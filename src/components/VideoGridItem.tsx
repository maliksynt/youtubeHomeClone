import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItemProps = {
  title: string;
  id: string;
  channel: {
    id: string;
    profileUrl: string;
    name: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export default function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) {
      return;
    }
    if (isVideoPlaying == null) {
      return;
    }

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div className="flex flex-col gap-2 ">
      <a
        href={`/watch?v=${id}`}
        className="relative aspect-video"
        onMouseEnter={() => {
          setIsVideoPlaying(true);
        }}
        onMouseLeave={() => {
          setIsVideoPlaying(false);
        }}
      >
        <img
          src={thumbnailUrl}
          className={`block object-cover w-full h-full rounded-xl transition-[border-radius] duration-200 
          ${isVideoPlaying ? "rounded-none delay-200" : "rounded-xl"}`}
        />
        <div className="absolute text-sm bottom-1 right-1 bg-secondary-dark text-secondary px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`absolute inset-0 block object-cover h-full transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100" : "opacity-0"
          }`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        ></video>
      </a>
      <div className="flex gap-2 ">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-sm text-secondary-text">
            {channel.name}
          </a>
          <div className="flex gap-1 text-sm text-secondary-text">
            <span>{VIEW_FORMATTER.format(views)} views</span>
            <span> • </span>
            <span>{formatTimeAgo(postedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
