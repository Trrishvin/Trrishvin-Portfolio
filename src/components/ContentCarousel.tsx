import type { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from "./core/carousel";

interface ContentCarouselProps {
  children: ReactNode[];
  label: string;
}

export function ContentCarousel({ children, label }: ContentCarouselProps) {
  return (
    <Carousel
      aria-roledescription="carousel"
      aria-label={label}
      className="mx-auto w-full min-w-0 max-w-3xl overflow-hidden"
    >
      <CarouselContent>
        {children.map((child, index) => (
          <CarouselItem key={index} className="relative basis-full">
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNavigation />
    </Carousel>
  );
}
