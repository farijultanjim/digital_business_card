// components/edit-page/MobilePreview.jsx
import Image from "next/image";
import Link from "next/link";
import {
  FaTelegram,
  FaWhatsapp,
  FaFacebookF,
  FaFacebookMessenger,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
  FaSpotify,
  FaPinterestP,
  FaSnapchat,
  FaTwitch,
  FaDiscord,
  FaRedditAlien,
  FaThreads,
} from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link2 } from "lucide-react";
import { CollapsibleHealthRecords } from "@/components/CollapsibleHealthRecords";

const platformIcons = {
  email: MdEmail,
  phone: MdPhone,
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  facebook: FaFacebookF,
  messenger: FaFacebookMessenger,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  spotify: FaSpotify,
  pinterest: FaPinterestP,
  snapchat: FaSnapchat,
  twitch: FaTwitch,
  discord: FaDiscord,
  thread: FaThreads,
  reddit: FaRedditAlien,
  address: MdLocationOn,
};

export const MobilePreview = ({
  sections,
  pageData,
  backgroundColor,
  fontFamily,
}) => {
  const renderPreviewSections = () => {
    return sections.map((section) => {
      const sectionTypes = {
        link: () => (
          <Link
            href={section.data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-lg capitalize">
                {section.data.label}
              </span>
            </div>
          </Link>
        ),
        heading: () => {
          const HeadingTag = section.data.type;
          const sizes = {
            h1: "text-[32px]",
            h2: "text-[24px]",
            h3: "text-[20.8px]",
            h4: "text-[16px]",
            h5: "text-[12.8px]",
            h6: "text-[11.2px]",
          };
          return (
            <div className="px-2">
              <HeadingTag className={`font-bold ${sizes[section.data.type]}`}>
                {section.data.text}
              </HeadingTag>
            </div>
          );
        },
        paragraph: () => (
          <div className="px-4 py-2">
            <p className="text-gray-700 text-center">{section.data.text}</p>
          </div>
        ),
        image: () => (
          <div className="">
            <div className="relative w-full rounded-lg overflow-hidden">
              <Image
                src={section.data.imageUrl}
                alt={section.data.alt || ""}
                width={0}
                height={0}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        ),
        socials: () => {
          const socialLinks = Object.entries(section.data).filter(
            ([key, value]) => value && !["iconColor", "iconSize"].includes(key)
          );

          return (
            <div className="grid grid-cols-4 gap-4 px-4 py-2">
              {socialLinks.map(([platform, value]) => {
                const prefixMap = {
                  telegram: "t.me/",
                  whatsapp: "wa.me/",
                  facebook: "facebook.com/",
                  messenger: "m.me/",
                  instagram: "instagram.com/",
                  twitter: "x.com/",
                  tiktok: "tiktok.com/@",
                  youtube: "youtube.com/",
                  linkedin: "linkedin.com/",
                  spotify: "open.spotify.com/artist/",
                  pinterest: "pinterest.com/",
                  snapchat: "snapchat.com/add/",
                  twitch: "twitch.tv/",
                  discord: "discord.gg/",
                  thread: "threads.net/@",
                  reddit: "reddit.com/",
                };

                const IconComponent = platformIcons[platform];
                const getIconSize = (size) => {
                  const sizes = {
                    small: { container: "w-8 h-8", icon: "w-4 h-4" },
                    medium: { container: "w-12 h-12", icon: "w-6 h-6" },
                    large: { container: "w-14 h-14", icon: "w-8 h-8" },
                    default: { container: "w-10 h-10", icon: "w-5 h-5" },
                  };
                  return sizes[size] || sizes.default;
                };

                const sizes = getIconSize(section.data.iconSize);
                const href = prefixMap[platform]
                  ? `https://${prefixMap[platform]}${value}`
                  : platform === "email"
                  ? `mailto:${value}`
                  : platform === "phone"
                  ? `tel:${value}`
                  : value;

                return (
                  <Link
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`${sizes.container} flex items-center justify-center hover:scale-110 transition-transform duration-200`}
                    >
                      {IconComponent && (
                        <IconComponent
                          className={sizes.icon}
                          style={{ color: section.data.iconColor }}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        },
        health: () => (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <CollapsibleHealthRecords records={section.data.records} />
          </div>
        ),
      };

      return (
        <div key={section.id}>
          {sectionTypes[section.type] ? sectionTypes[section.type]() : null}
        </div>
      );
    });
  };

  return (
    <div className="lg:w-1/2 flex flex-col items-center">
      <div className="sticky top-5">
        <div className="w-[320px] h-[620px] bg-white rounded-[3rem] shadow-xl border-8 border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-8">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-full"></div>
          </div>

          <div
            className="h-full  rounded-[2rem] overflow-y-auto"
            style={{
              backgroundColor: backgroundColor,
              background: backgroundColor,
              fontFamily: `${fontFamily}, system-ui, sans-serif`,
            }}
          >
            <div className="mt-8">
              <div className="flex flex-col items-center px-4">
                <div className="w-24 h-24 rounded-full bg-gray-300 mb-4" />
                <h2
                  className="text-xl font-bold"
                  style={{ color: pageData.fontColor }}
                >
                  {pageData.name}
                </h2>
              </div>

              <div className="my-6 space-y-4 px-5">
                {renderPreviewSections()}
                <div className="h-20 bg-white rounded-lg shadow-sm" />
                <div className="h-32 bg-white rounded-lg shadow-sm" />
                <div className="h-24 bg-white rounded-lg shadow-sm" />
                <div className="py-5">
                  <p
                    className="text-center text-xs"
                    style={{ color: pageData.fontColor }}
                  >
                    Powered by ROBUST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
