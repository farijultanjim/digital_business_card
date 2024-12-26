import { Link,  Image, MessagesSquare , X, Stethoscope, Pilcrow, Heading } from "lucide-react";

// Modal component for section type selection
export const AddSectionModal = ({ isOpen, onClose, onSelectType }) => {
  if (!isOpen) return null;

  const sectionTypes = [
    { id: "link", label: "Link", icon: Link },
    { id: "heading", label: "Heading", icon: Heading },
    { id: "paragraph", label: "Paragraph", icon: Pilcrow },
    { id: "image", label: "Image", icon: Image },
    { id: "socials", label: "Socials", icon: MessagesSquare  },
    { id: "health", label: "Health Data", icon: Stethoscope },
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Add Section</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Section Type Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {sectionTypes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  onSelectType(id);
                  onClose();
                }}
                className="flex flex-col items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
