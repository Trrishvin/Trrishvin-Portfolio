import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselContextValue {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  setContentElement: (element: HTMLDivElement | null) => void;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used inside Carousel.");
  }
  return context;
}

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Carousel({ children, className, ...props }: CarouselProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = () => {
    const element = contentRef.current;
    if (!element) return;

    setCanScrollPrev(element.scrollLeft > 4);
    setCanScrollNext(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 4,
    );
  };

  const scrollByPage = (direction: number) => {
    contentRef.current?.scrollBy({
      left: direction * contentRef.current.clientWidth * 0.86,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollState();
    const element = contentRef.current;
    element?.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      element?.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <CarouselContext.Provider
      value={{
        canScrollPrev,
        canScrollNext,
        scrollPrev: () => scrollByPage(-1),
        scrollNext: () => scrollByPage(1),
        setContentElement: (element) => {
          contentRef.current = element;
          updateScrollState();
        },
      }}
    >
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

interface CarouselContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CarouselContent({
  children,
  className,
  ...props
}: CarouselContentProps) {
  const { setContentElement } = useCarousel();

  return (
    <div
      ref={setContentElement}
      className={cn(
        "flex w-full min-w-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CarouselItem({
  children,
  className,
  ...props
}: CarouselItemProps) {
  return (
    <div
      className={cn("min-w-0 shrink-0 snap-start basis-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CarouselNavigation({ className }: { className?: string }) {
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarousel();

  return (
    <div
      className={cn("mt-6 flex items-center justify-center gap-3", className)}
    >
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#05668d]/40 text-gray-300 transition-colors hover:border-[#16c172] hover:text-[#16c172] disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Previous carousel item"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
        Swipe to explore
      </span>
      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#05668d]/40 text-gray-300 transition-colors hover:border-[#16c172] hover:text-[#16c172] disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Next carousel item"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
