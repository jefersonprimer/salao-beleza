import React, { useState } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackTitle = "Beleza Urbana",
  fallbackSubtitle = "Studio & Hair",
  containerClassName = "",
  className = "",
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`bg-[#F2EFE9] flex flex-col items-center justify-center text-center p-6 border border-[#E8E5DD] ${containerClassName}`}
        role="img"
        aria-label={alt || fallbackTitle}
      >
        <span className="font-serif text-xl tracking-tight text-[#191716] italic">
          {fallbackTitle}
        </span>
        <span className="text-xs uppercase tracking-widest text-[#6B6560] mt-1">
          {fallbackSubtitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
