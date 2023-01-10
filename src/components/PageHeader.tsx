import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTheme } from "../contexts/Theme";
import { DOMAIN_MID_PATH } from "../utils/globals";
import type { AttachedImage } from "../utils/trpc";
import Image from "next/image";

const PageHeader: FC<{
  name: string | undefined;
  image: AttachedImage | undefined;
  setPageTitle: Dispatch<SetStateAction<string>>;
}> = ({ name, image, setPageTitle }) => {
  const { theme, setColor } = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (name !== undefined) {
      setPageTitle(name);
    }
  }, [name, setPageTitle]);

  const { r = 255, g = 255, b = 255 } = image ?? {};

  const imageUrl =
    image &&
    image.domain.name + "/" + DOMAIN_MID_PATH[image.domain.id] + image.image_id;

  useEffect(() => {
    if (r !== undefined && g !== undefined && b !== undefined) {
      setColor(r, g, b);
    }

    return () => setColor(255, 255, 255);
  }, [r, g, b, setColor]);

  return (
    <div className="relative mb-10 h-[25rem]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={"Image of " + name}
          width={1920}
          height={400}
          className="h-full w-full object-cover object-[0%_25%]"
          onLoad={() => setImageLoaded(true)}
        />
      )}
      <div
        className="absolute top-0 right-0 h-full w-full"
        style={{
          background: `linear-gradient(rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, ${
            imageLoaded ? "0" : "1"
          })`,
        }}
      ></div>

      <div className="absolute top-[3.75rem] w-full">
        <div className="mx-auto box-content max-w-[95rem] px-20">
          <div className="w-1/2">
            <div
              className={
                "mb-[1.875rem] text-[2.5rem] font-bold" +
                (theme === "dark" ? " text-white" : "")
              }
            >
              {name}
            </div>
          </div>
          <button className="h-10 w-[10.625rem] border border-[rgba(180,180,180,1)] bg-white">
            <div className="flex justify-center">
              <Image
                src="/assets/play.svg"
                alt="Play tracks"
                width={54}
                height={54}
                className="mr-2.5 w-[0.938rem]"
              />
              <div className="font-['Open_Sans'] text-[0.78rem] font-bold uppercase tracking-[0.04rem]">
                Play tracks
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
