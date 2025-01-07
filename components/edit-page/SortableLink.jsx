"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Copy,
  Edit,
  GripVertical,
  Heading,
  Link2,
  Image as LucideImage,
  MessagesSquare,
  MoreVertical,
  Pilcrow,
  Stethoscope,
  Trash2,
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableLink = ({ section, onEdit, onDelete, onDuplicate }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const handleClickOutside = () => {
    setActiveMenu(null);
  };

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
      const recordsCount = section.data.records.length;
      return (
        <>
          <h3 className="font-medium">Health Records</h3>
          <p className="text-sm text-gray-500">
            {recordsCount} {recordsCount === 1 ? "record" : "records"} added
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
                <div
                  className="fixed inset-0 z-10"
                  onClick={handleClickOutside}
                />
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

export default SortableLink;
