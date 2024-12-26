
// app/dashboard/overview/page.jsx

import { Users, QrCode, FileText, FolderKanban } from "lucide-react";

export default function OverviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 ">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <StatCard
          title="Total Pages"
          value="892"
          icon={FileText}
        />

        <StatCard
          title="Total QR"
          value="1243"
          icon={QrCode}
        />
        <StatCard
          title="Total Users"
          value="2543"
          icon={Users}
        />

        <StatCard
          title="Current Plan"
          value="Gold"
          icon={FolderKanban}
          
        />
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-p">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
