type AvatarSize = "small" | "medium" | "large";

interface AvatarProps {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
}

export default function Avatar({
  image,
  size = "large",
  highlight = false,
}: AvatarProps) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* 
        외부 url이 있다면 추가할 수 있지만
        외부 url을 알 수 없으므로 일반 img 태그를 사용한다
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        alt="user profile"
        className={`bg-white rounded-full object-cover ${getImageSizeStyle(
          size
        )}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = getContainerSize(size);
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getContainerSize(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "medium":
      return "w-11 h-11";
    case "large":
      return "w-[68px] h-[68px]";
  }
}

function getImageSizeStyle(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "w-[34px] h-[34px] p-[0.1rem]";
    case "medium":
      return "w-[42px] h-[42px] p-[0.1rem]";
    case "large":
      return "w-16 h-16 p-[0.2rem]";
  }
}
