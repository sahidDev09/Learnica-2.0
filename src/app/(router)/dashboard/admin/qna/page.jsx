import React from "react";
import { MessageSquare } from "lucide-react";

const QNA = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Total QNA</h1>
          <p className="text-gray-600">View and manage all questions and answers</p>
        </div>
        
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
          <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">QNA Management</h2>
          <p className="text-gray-600">This section is under development</p>
        </div>
      </div>
    </div>
  );
};

export default QNA;
