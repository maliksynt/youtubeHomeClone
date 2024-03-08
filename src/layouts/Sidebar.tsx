import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../components/Button";
import { useSidebarContext } from "../context/SidebarContext";
import { playlists, subscriptions } from "../data/dataSidebar";
import { PageHeaderFirstSection } from "./PageHeader";

export default function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSideBarItem Icon={Home} title="Home" url="/" />
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSideBarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSideBarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="fixed inset-0 lg:hidden z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="sticky top-0 px-2 pt-2 pb-4 bg-white lg:hidden ">
          <PageHeaderFirstSection />
        </div>
        <LargeSideBarSection visibleItemsCount={1}>
          <LargeSideBarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSideBarItem
            isActive={false}
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemsCount={5}>
          <LargeSideBarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSideBarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSideBarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSideBarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSideBarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Subscriptions" url="/subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSideBarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Explore">
          <LargeSideBarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSideBarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSideBarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSideBarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSideBarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSideBarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSideBarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSideBarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSideBarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSideBarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSideBarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSideBarSection>
      </aside>
    </>
  );
}

type SmallSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemsCount?: number;
  url?: string;
};

type LargeSideBarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function SmallSideBarItem({ Icon, title, url }: SmallSideBarItemProps) {
  return (
    <>
      <Button
        className={twMerge(
          buttonStyles({ variant: "ghost" }),
          "bg-transparent px-1 py-4 rounded-lg"
        )}
      >
        <a className="flex flex-col items-center gap-1 " href={url}>
          <Icon className="w-6 h-6" />
          <div className="text-sm">{title}</div>
        </a>
      </Button>
    </>
  );
}

function LargeSideBarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) {
  return (
    <>
      <Button
        className={twMerge(
          buttonStyles({ variant: "ghost" }),
          `bg-transparent w-full rounded-lg p-3 ${
            isActive ? "bg-neutral-100 hover:bg-secondary" : undefined
          }`
        )}
      >
        <a
          className={`flex items-center gap-4 ${
            isActive ? "font-bold" : undefined
          }`}
          href={url}
        >
          {typeof IconOrImgUrl === "string" ? (
            <img src={IconOrImgUrl} alt="" className="w-6 h-6 rounded-full" />
          ) : (
            <IconOrImgUrl className="w-6 h-6" />
          )}
          <div className="overflow-hidden text-sm whitespace-nowrap text-ellipsis">
            {title}
          </div>
        </a>
      </Button>
    </>
  );
}

function LargeSideBarSection({
  children,
  title,
  visibleItemsCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemsCount);
  const showExpandButton = childrenArray.length > visibleItemsCount;
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="mt-2 mb-1 ml-4 text-lg">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => {
            setIsExpanded((prev) => !prev);
          }}
          variant="ghost"
          className="flex items-center w-full gap-4 p-3 bg-transparent rounded-lg"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}
