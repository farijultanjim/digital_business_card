// app/dashboard/pages/[id]/edit/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Plus,
  Trash2,
  GripVertical,
  Edit,
  MoreVertical,
  Copy,
  Link2,
  Image as LucideImage,
  Heading,
  Pilcrow,
  MessagesSquare,
  Stethoscope,
} from "lucide-react";

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

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { AddSectionModal } from "@/components/modals/AddSectionModal";
import { LinkModal } from "@/components/modals/LinkModal";
import { HeadingModal } from "@/components/modals/HeadingModal";
import { ParagraphModal } from "@/components/modals/ParagraphModal";
import { ImageModal } from "@/components/modals/ImageModal";
import { SocialLinksModal } from "@/components/modals/SocialLinksModal";
import { HealthDataModal } from "@/components/modals/HealthDataModal";
import { set } from "react-hook-form";

// Sortable Link Item Component
const SortableLink = ({ section, onEdit, onDelete, onDuplicate }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  // Function to render appropriate icon based on section type
  const renderIcon = () => {
    if (section.type === "link") {
      return <Link2 className="w-5 h-5 text-primary" />;
    } else if (section.type === "heading") {
      return <Heading className="w-5 h-5 text-primary" />;
    } else if (section.type === "paragraph") {
      return <Pilcrow className="w-5 h-5 text-primary" />;
    } else if (section.type === "image") {
      return <LucideImage className="w-5 h-5 text-primary" />;
    } else if (section.type === "socials") {
      return <MessagesSquare className="w-5 h-5 text-primary" />;
    } else if (section.type === "health") {
      return <Stethoscope className="w-5 h-5 text-primary" />;
    }
  };

  // Function to render appropriate content based on section type
  const renderContent = () => {
    if (section.type === "link") {
      return (
        <>
          <h3 className="font-medium">{section.data.label}</h3>
          <p className="text-sm text-gray-500">{section.data.url}</p>
        </>
      );
    } else if (section.type === "heading") {
      return (
        <>
          <h3 className="font-medium">
            {section.data.type.toUpperCase()} Heading
          </h3>
          <p className="text-sm text-gray-500">{section.data.text}</p>
        </>
      );
    } else if (section.type === "paragraph") {
      return (
        <>
          <h3 className="font-medium">Paragraph</h3>
          <p className="text-sm text-gray-500 truncate">{section.data.text}</p>
        </>
      );
    } else if (section.type === "image") {
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Image
              src={section.data.imageUrl}
              alt={section.data.alt || "image-section"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      );
    } else if (section.type === "socials") {
      const socialCount = Object.entries(section.data).filter(
        ([key, value]) => value && !["iconColor", "iconSize"].includes(key)
      ).length;

      return (
        <>
          <h3 className="font-medium">Social Links</h3>
          <p className="text-sm text-gray-500">
            {socialCount} {socialCount === 1 ? "link" : "links"} configured
          </p>
        </>
      );
    } else if (section.type === "health") {
      return (
        <>
          <h3 className="font-medium">{section.data.name}</h3>
          <p className="text-sm text-gray-500">
            {section.data.type} - {section.data.date}
          </p>
        </>
      );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 bg-gray-50 rounded-lg border border-gray-200 
        ${isDragging ? "shadow-lg opacity-75" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none"
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            {renderIcon()}
          </div>
          <div>{renderContent()}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() =>
                setActiveMenu(activeMenu === section.id ? null : section.id)
              }
              className="p-2 hover:bg-primary-light rounded-full transition-colors "
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {activeMenu === section.id && (
              <>
                <div className="fixed  " />
                <div className="absolute right-0  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1" role="menu">
                    <button
                      onClick={() => onEdit(section.id)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <Edit className="w-4 h-4 mr-3" />
                      Edit
                    </button>
                    <button
                      onClick={onDuplicate}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <Copy className="w-4 h-4 mr-3" />
                      Duplicate
                    </button>
                    <button
                      onClick={() => onDelete(section.id)}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EditPagePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("sections");

  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isHeadingModalOpen, setIsHeadingModalOpen] = useState(false);
  const [isParagraphModalOpen, setIsParagraphModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSocialLinksModalOpen, setIsSocialLinksModalOpen] = useState(false);
  const [isHealthDataModalOpen, setIsHealthDataModalOpen] = useState(false);

  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);

  // dummy data
  const pageData = {
    name: "Farijul Tanzil",
    id: id,
  };

  const handleSectionTypeSelect = (type) => {
    if (type === "link") {
      setIsLinkModalOpen(true);
    } else if (type === "heading") {
      setIsHeadingModalOpen(true);
    } else if (type === "paragraph") {
      setIsParagraphModalOpen(true);
    } else if (type === "image") {
      setIsImageModalOpen(true);
    } else if (type === "socials") {
      setIsSocialLinksModalOpen(true);
    } else if (type === "health") {
      setIsHealthDataModalOpen(true);
    }
  };

  const handleLinkSubmit = (linkData) => {
    if (editingSection) {
      // Update existing section
      setSections(
        sections.map((section) =>
          section.id === editingSection.id
            ? { ...section, data: linkData }
            : section
        )
      );
      setEditingSection(null);
    } else {
      // Add new section
      setSections([
        ...sections,
        {
          id: Date.now().toString(),
          type: "link",
          data: linkData,
        },
      ]);
    }
    setIsLinkModalOpen(false);
  };

  const handleHeadingSubmit = (headingData) => {
    if (editingSection) {
      // Update existing section
      setSections(
        sections.map((section) =>
          section.id === editingSection.id
            ? { ...section, data: headingData }
            : section
        )
      );
      setEditingSection(null);
    } else {
      // Add new section
      setSections([
        ...sections,
        {
          id: Date.now().toString(),
          type: "heading",
          data: headingData,
        },
      ]);
    }
    setIsHeadingModalOpen(false);
  };

  const handleParagraphSubmit = (paragraphData) => {
    if (editingSection) {
      // Update existing section
      setSections(
        sections.map((section) =>
          section.id === editingSection.id
            ? { ...section, data: paragraphData }
            : section
        )
      );
      setEditingSection(null);
    } else {
      setSections([
        ...sections,
        {
          id: Date.now().toString(),
          type: "paragraph",
          data: paragraphData,
        },
      ]);
    }
    setIsParagraphModalOpen(false);
  };

  const handleImageSubmit = async (imageData) => {
    if (editingSection) {
      // Update existing section
      setSections(
        sections.map((section) =>
          section.id === editingSection.id
            ? {
                ...section,
                data: {
                  imageUrl:
                    imageData.imageUrl instanceof File
                      ? URL.createObjectURL(imageData.imageUrl) // Create URL for new image
                      : imageData.imageUrl, // Keep existing URL if no new image
                  alt: imageData.alt,
                },
              }
            : section
        )
      );
      setEditingSection(null);
    } else {
      // Add new section
      const imageUrl =
        imageData.imageUrl instanceof File
          ? URL.createObjectURL(imageData.imageUrl)
          : imageData.imageUrl;

      setSections([
        ...sections,
        {
          id: Date.now().toString(),
          type: "image",
          data: {
            imageUrl: imageUrl,
            alt: imageData.alt,
          },
        },
      ]);
    }
    setIsImageModalOpen(false);
  };


  const handleSocialLinksSubmit = (socialData) => {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        type: "socials",
        data: socialData,
      },
    ]);
  };

  const handleHealthDataSubmit = (records) => {
    // Add each record as a separate section
    records.forEach((record) => {
      setSections((prevSections) => [
        ...prevSections,
        {
          id: Date.now().toString() + Math.random(),
          type: "health",
          data: {
            name: record.name,
            type: record.type,
            date: record.date,
            image: record.image,
          },
        },
      ]);
    });
  };

  const handleLinkModalClose = () => {
    setIsLinkModalOpen(false);
    setEditingSection(null);
  };

  const handleHeadingModalClose = () => {
    setIsHeadingModalOpen(false);
    setEditingSection(null);
  };

  const handleParagraphModalClose = () => {
    setIsParagraphModalOpen(false);
    setEditingSection(null);
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
    setEditingSection(null);
  };

  const handleSocialLinksModalClose = () => {
    setIsSocialLinksModalOpen(false);
    setEditingSection(null);
  };

  const handleHealthDataModalClose = () => {
    setIsHealthDataModalOpen(false);
    setEditingSection(null);
  };

  const handleEdit = (sectionId) => {
    const section = sections.find((section) => section.id === sectionId);
    setEditingSection(section);

    // Open appropriate modal based on section type
    if (section.type === "link") {
      setIsLinkModalOpen(true);
    } else if (section.type === "heading") {
      setIsHeadingModalOpen(true);
    } else if (section.type === "paragraph") {
      setIsParagraphModalOpen(true);
    } else if (section.type === "image") {
      setIsImageModalOpen(true);
    } else if (section.type === "socials") {
      setIsSocialLinksModalOpen(true);
    } else if (section.type === "health") {
      setIsHealthDataModalOpen(true);
    }
  };

  const handleDuplicate = (sectionId) => {
    const sectionToDuplicate = sections.find(
      (section) => section.id === sectionId
    );
    if (sectionToDuplicate) {
      const duplicatedSection = {
        ...sectionToDuplicate,
        id: Date.now().toString(),
        data: {
          ...sectionToDuplicate.data,
          label: `${sectionToDuplicate.data.label} (Copy)`,
        },
      };

      const originalIndex = sections.findIndex(
        (section) => section.id === sectionId
      );
      const newSections = [...sections];
      newSections.splice(originalIndex + 1, 0, duplicatedSection);

      setSections(newSections);
    }
  };

  const handleDelete = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // render sections
  const renderSections = () => {
    if (sections.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No sections added yet. Click the &quot;Add Section&quot; button to add
          one.
        </div>
      );
    }

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {sections.map((section) => (
              <SortableLink
                key={section.id}
                section={section}
                onEdit={() => handleEdit(section.id)}
                onDuplicate={() => handleDuplicate(section.id)}
                onDelete={() => handleDelete(section.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  };

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

  // the preview content
  const renderPreviewSections = () => {
    return sections.map((section) => {
      if (section.type === "link") {
        return (
          <Link
            key={section.id}
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
        );
      } else if (section.type === "heading") {
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
          <div key={section.id} className="px-2">
            <HeadingTag className={`font-bold ${sizes[section.data.type]}`}>
              {section.data.text}
            </HeadingTag>
          </div>
        );
      } else if (section.type === "paragraph") {
        return (
          <div key={section.id} className="px-4 py-2">
            <p className="text-gray-700">{section.data.text}</p>
          </div>
        );
      } else if (section.type === "image") {
        return (
          <div key={section.id} className="">
            <div className="relative w-full rounded-lg overflow-hidden">
              <Image
                src={section.data.imageUrl}
                alt={section.data.alt || ""}
                width={0}
                height={0}
                // sizes="100vw"
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        );
      } else if (section.type === "socials") {
        const socialLinks = Object.entries(section.data).filter(
          ([key, value]) => value && !["iconColor", "iconSize"].includes(key)
        );

        return (
          <div key={section.id} className="grid grid-cols-4 gap-4 px-4 py-2">
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
                switch (size) {
                  case "small":
                    return { container: "w-8 h-8", icon: "w-4 h-4" };
                  case "medium":
                    return { container: "w-12 h-12", icon: "w-6 h-6" };
                  case "large":
                    return { container: "w-14 h-14", icon: "w-8 h-8" };
                  default:
                    return { container: "w-10 h-10", icon: "w-5 h-5" };
                }
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
                    className={`${sizes.container}  flex items-center justify-center hover:scale-110 transition-transform duration-200`}
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
      } else if (section.type === "health") {
        return (
          <div key={section.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{section.data.name}</h3>
                  <p className="text-sm text-gray-500">
                    {section.data.type} - {section.data.date}
                  </p>
                </div>
              </div>
              {section.data.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={URL.createObjectURL(section.data.image)}
                    alt={section.data.name}
                    fill
                    className="object-contain rounded-lg"
                    unoptimized
                  />
                </div>
              )}
            </div>
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div className="p-6">
      {/* Header with user name and page ID */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{pageData.name}</h1>
        <p className="mt-1 text-sm text-gray-500">Page ID: {pageData.id}</p>
      </div>

      {/* Section Modal */}
      <AddSectionModal
        isOpen={isAddSectionModalOpen}
        onClose={() => setIsAddSectionModalOpen(false)}
        onSelectType={handleSectionTypeSelect}
      />
      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={handleLinkModalClose}
        onSubmit={handleLinkSubmit}
        editData={editingSection?.type === "link" ? editingSection.data : null}
      />
      <HeadingModal
        isOpen={isHeadingModalOpen}
        onClose={handleHeadingModalClose}
        onSubmit={handleHeadingSubmit}
        editData={
          editingSection?.type === "heading" ? editingSection.data : null
        }
      />
      <ParagraphModal
        isOpen={isParagraphModalOpen}
        onClose={handleParagraphModalClose}
        onSubmit={handleParagraphSubmit}
        editData={
          editingSection?.type === "paragraph" ? editingSection.data : null
        }
      />
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={handleImageModalClose}
        onSubmit={handleImageSubmit}
        editData={editingSection?.type === "image" ? editingSection.data : null}
      />

      <SocialLinksModal
        isOpen={isSocialLinksModalOpen}
        onClose={handleSocialLinksModalClose}
        onSubmit={handleSocialLinksSubmit}
        editData={
          editingSection?.type === "socials" ? editingSection.data : null
        }
      />

      <HealthDataModal
        isOpen={isHealthDataModalOpen}
        onClose={handleHealthDataModalClose}
        onSubmit={handleHealthDataSubmit}
        editData={editingSection?.type === "health" ? editingSection.data : null}
      />

      {/* Tabs and Add Section Button */}
      <div className="flex items-center justify-between mb-12 ">
        <div className="flex gap-4 ">
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-4 px-4 relative ${
              activeTab === "settings"
                ? "text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Settings
            {activeTab === "settings" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("sections")}
            className={`pb-4 px-4 relative ${
              activeTab === "sections"
                ? "text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sections
            {activeTab === "sections" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        </div>

        <button
          className="btn-primary flex items-center gap-2 py-2 group"
          onClick={() => setIsAddSectionModalOpen(true)}
        >
          <span className="group-hover:rotate-90 transition-transform duration-300 font-bold">
            <Plus className="w-5 h-5 " />
          </span>
          Add Section
        </button>
      </div>

      {/* Main content area with preview */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Tab content */}
        <div className="flex-1 lg:w-1/2 bg-white rounded-lg shadow p-6">
          {activeTab === "settings" ? (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Page Settings</h2>
              <p className="text-gray-500">Settings content will go here</p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Page Sections</h2>
              <div className="space-y-4">{renderSections()}</div>
            </div>
          )}
        </div>

        {/* Right side - Preview */}
        <div className="lg:w-1/2 flex flex-col items-center">
          <div className="sticky top-5">
            {/* Mobile Device Frame */}
            <div className="w-[320px] h-[620px] bg-white rounded-[3rem] shadow-xl  border-8 border-gray-800 relative overflow-hidden">
              {/* top Bar design */}
              <div className="absolute top-0 left-0 right-0 h-8 ">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-full"></div>
              </div>

              {/* Content Area */}
              <div className="h-full  bg-gray-100 rounded-[2rem] overflow-y-auto">
                {/* Preview Content */}
                <div className="mt-8">
                  {/* Profile Section */}
                  <div className="flex flex-col items-center px-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                    <h2 className="text-xl font-bold">{pageData.name}</h2>
                  </div>

                  {/* Placeholder Sections */}
                  <div className="my-6 space-y-4 px-5">
                    {renderPreviewSections()}
                    <div className="h-20 bg-white rounded-lg shadow-sm" />
                    <div className="h-32 bg-white rounded-lg shadow-sm" />
                    <div className="h-24 bg-white rounded-lg shadow-sm" />
                    <div className="py-5">
                      <p className="text-center text-xs">Powered by ROBUST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
