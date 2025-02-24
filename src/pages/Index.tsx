
import { useState } from "react";
import { Smile } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#D3E4FD] p-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4 flex items-center justify-center gap-2">
            <Smile className="w-10 h-10 text-yellow-500" />
            WHY?
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4">
          <elevenlabs-convai agent-id="bvV3UYHC4ytDbrYZI1Zm"></elevenlabs-convai>
        </div>
      </div>
    </div>
  );
};

export default Index;
