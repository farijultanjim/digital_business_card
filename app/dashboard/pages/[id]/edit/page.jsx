// app/dashboard/pages/[id]/edit/page.jsx
"use client";

import { useState } from "react";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { AddSectionModal } from "@/components/modals/AddSectionModal";
import { LinkModal } from "@/components/modals/LinkModal";
import { HeadingModal } from "@/components/modals/HeadingModal";
import { ParagraphModal } from "@/components/modals/ParagraphModal";
import { ImageModal } from "@/components/modals/ImageModal";
import { SocialLinksModal } from "@/components/modals/SocialLinksModal";
import { HealthDataModal } from "@/components/modals/HealthDataModal";
import SortableLink from "@/components/edit-page/SortableLink";
import { MobilePreview } from "@/components/edit-page/MobilePreview";
import { PageSettings } from "@/components/edit-page/PageSettings";

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
  const [pageData, setPageData] = useState({
    name: "Farijul Tanzil",
    id: id,
    backgroundColor: "#f3f4f6", // default background color
    fontFamily: "sans-serif", // default font family
  });

  const updatePageData = (newPageData) => {
    setPageData(newPageData);
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
    if (editingSection) {
      // Update existing section
      setSections(
        sections.map((section) =>
          section.id === editingSection.id
            ? { ...section, data: socialData }
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
          type: "socials",
          data: socialData,
        },
      ]);
    }
    setIsSocialLinksModalOpen(false);
  };

  const handleHealthDataSubmit = (records) => {
    if (editingSection) {
      // Update existing section
      setSections(
        sections.map((section) =>
          section.id === editingSection.id
            ? {
                ...section,
                data: {
                  records: records, // Store all records in an array
                },
              }
            : section
        )
      );
      setEditingSection(null);
    } else {
      // Add new section with all records
      setSections((prevSections) => [
        ...prevSections,
        {
          id: Date.now().toString() + Math.random(),
          type: "health",
          data: {
            records: records, // Store all records in an array
          },
        },
      ]);
    }
    setIsHealthDataModalOpen(false);
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
        onClose={() => {
          setIsLinkModalOpen(false);
          setEditingSection(null);
        }}
        onSubmit={handleLinkSubmit}
        editData={editingSection?.type === "link" ? editingSection.data : null}
      />
      <HeadingModal
        isOpen={isHeadingModalOpen}
        onClose={() => {
          setIsHeadingModalOpen(false);
          setEditingSection(null);
        }}
        onSubmit={handleHeadingSubmit}
        editData={
          editingSection?.type === "heading" ? editingSection.data : null
        }
      />
      <ParagraphModal
        isOpen={isParagraphModalOpen}
        onClose={() => {
          setIsParagraphModalOpen(false);
          setEditingSection(null);
        }}
        onSubmit={handleParagraphSubmit}
        editData={
          editingSection?.type === "paragraph" ? editingSection.data : null
        }
      />
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          setEditingSection(null);
        }}
        onSubmit={handleImageSubmit}
        editData={editingSection?.type === "image" ? editingSection.data : null}
      />

      <SocialLinksModal
        isOpen={isSocialLinksModalOpen}
        onClose={() => {
          setIsSocialLinksModalOpen(false);
          setEditingSection(null);
        }}
        onSubmit={handleSocialLinksSubmit}
        editData={
          editingSection?.type === "socials" ? editingSection.data : null
        }
      />

      <HealthDataModal
        isOpen={isHealthDataModalOpen}
        onClose={() => {
          setIsHealthDataModalOpen(false);
          setEditingSection(null);
        }}
        onSubmit={handleHealthDataSubmit}
        editData={
          editingSection?.type === "health" ? editingSection.data : null
        }
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
              <div>
                <PageSettings
                  pageData={pageData}
                  updatePageData={updatePageData}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Page Sections</h2>
              <div className="space-y-4">{renderSections()}</div>
            </div>
          )}
        </div>

        {/* Right side - Preview */}
        <MobilePreview
          pageData={pageData}
          sections={sections}
          backgroundColor={pageData.backgroundColor}
          fontFamily={pageData.fontFamily}
        />
      </div>
    </div>
  );
}
