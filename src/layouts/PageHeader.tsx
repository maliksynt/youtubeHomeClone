import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import YoutubeLogo from "../assets/youtube-logo-png-transparent-image-5.webp";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../context/SidebarContext";

export default function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className="flex items-center justify-between gap-10 pt-2 mx-4 mb-6 lg:gap-20">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`justify-center flex-grow gap-4 ${
          showFullWidthSearch ? "flex" : "hidden  md:flex"
        } `}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => {
              setShowFullWidthSearch(false);
            }}
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="w-full px-4 py-1 text-lg border rounded-l-full shadow-inner outline-none border-secondary-border shadow-secondary focus:border-blue-500"
          />
          <Button
            type="submit"
            className="flex-shrink-0 px-4 py-2 border border-l-0 rounded-r-full border-secondary-border"
          >
            <Search />
          </Button>
        </div>
        <Button
          type="button"
          variant="default"
          size="icon"
          className="flex-shrink-0"
        >
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => {
            setShowFullWidthSearch(true);
          }}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`items-center flex-shrink-0 gap-4 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu />
      </Button>
      <a href="/">
        <img src={YoutubeLogo} alt="Youtube Logo" className="h-14" />
      </a>
    </div>
  );
}
