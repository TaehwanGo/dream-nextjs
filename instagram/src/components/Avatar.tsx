type AvatarSize = "small" | "medium" | "large" | "xlarge";

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
        className={`bg-white rounded-full object-cover ${
          getImageSizeStyle(size).image
        }`}
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
  const { container } = getImageSizeStyle(size);
  return `${baseStyle} ${highlightStyle} ${container}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};
function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case "small":
      return {
        container: "w-9 h-9",
        image: "w-[34px] h-[34px] p-[0.1rem]",
      };
    case "medium":
      return {
        container: "w-11 h-11",
        image: "w-[42px] h-[42px] p-[0.1rem]",
      };
    case "large":
      return {
        container: "w-[68px] h-[68px]",
        image: "w-16 h-16 p-[0.2rem]",
      };
    case "xlarge":
      return {
        container: "w-[142px] h-[142px]",
        image: "w-[138px] h-[138px] p-[0.3rem]",
      };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
