import React from "react";
import { Video } from "lucide-react";

const LiveClass = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Live Class</h1>
          <p className="text-gray-600">Manage and schedule live classes</p>
        </div>
        
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Live Class Management</h2>
          <p className="text-gray-600">This section is under development</p>
        </div>
      </div>
    </div>
  );
};

export default LiveClass;
