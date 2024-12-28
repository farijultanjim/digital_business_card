'use client'

import { ChevronDown, ChevronUp, Stethoscope } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const CollapsibleHealthRecords = ({ records }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header with count and toggle */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Health Records</h3>
            <p className="text-sm text-gray-500">
              {records.length} {records.length === 1 ? "record" : "records"}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Expandable records list */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t">
          {records.map((record, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{record.name}</h4>
                  <p className="text-sm text-gray-500">
                    {record.type} - {record.date}
                  </p>
                </div>
              </div>
              {record.image && (
                <div className="mt-4 relative w-full h-48">
                  <Image
                    src={URL.createObjectURL(record.image)}
                    alt={record.name}
                    fill
                    className="object-contain rounded-lg"
                    unoptimized
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
