import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) {
        return;
      }
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      <div
        className="transition-transform flex whitespace-nowrap w-[max-content] gap-3"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category: string) => (
          <Button
            key={category}
            className="px-3 py-1 rounded-lg whitespace-nowrap"
            variant={category === selectedCategory ? "dark" : "default"}
            onClick={() => {
              onSelect(category);
            }}
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 -translate-y-1/2 top-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            className="w-auto h-full aspect-square p-1.5"
            onClick={() => {
              setTranslate((translate: number) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) {
                  return 0;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 -translate-y-1/2 top-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="w-auto h-full aspect-square p-1.5"
            onClick={() => {
              setTranslate((translate: number) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate: number = translate + TRANSLATE_AMOUNT;
                const edge: number = containerRef.current.scrollWidth;
                const width: number = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
