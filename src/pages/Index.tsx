
import { useState } from "react";
import { Smile, Phone, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceChat } from "@/components/VoiceChat";
import { useConversation } from '@11labs/react';

const Index = () => {
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const conversation = useConversation();

  const handleStartConversation = () => {
    console.log('Starting conversation...');
    setIsConversationOpen(true);
    setError('');
  };

  const handleEndConversation = () => {
    console.log('Ending conversation...');
    setIsConversationOpen(false);
    setError('');
  };

  console.log('Current conversation state:', isConversationOpen);
  console.log('Speaking state:', isSpeaking);

  return (
    <div className="min-h-screen bg-[#3772FF] p-4 font-fredoka">
      <div className="max-w-3xl mx-auto">
        {/* Header with Fisher-Price style */}
        <div className="bg-[#3772FF] rounded-b-3xl shadow-lg mb-8 p-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Smile className="w-10 h-10 text-[#F5E453]" />
            Learn with Lara
          </h1>
          <div className="text-white text-center text-lg">Your friendly chat companion!</div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Main interaction button with Fisher-Price style */}
          <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-lg p-2 transform hover:scale-105 transition-transform">
            <div className={`cursor-pointer ${isSpeaking ? 'animate-bounce' : ''}`}>
              <div 
                className={`w-24 h-24 rounded-full ${
                  isConversationOpen ? 'bg-[#4CAF50]' : 'bg-[#F5E453]'
                } flex items-center justify-center transition-colors border-4 border-white shadow-inner relative`}
                onClick={isConversationOpen ? handleEndConversation : handleStartConversation}
              >
                {isConversationOpen ? (
                  <PhoneOff className="w-12 h-12 text-red-500 absolute z-10" />
                ) : (
                  <Phone className="w-12 h-12 text-[#4CAF50] absolute z-10" />
                )}
                <div className={`w-16 h-16 rounded-full ${
                  isConversationOpen ? 'bg-[#4CAF50]/80' : 'bg-[#F5E453]/80'
                } flex items-center justify-center`}>
                  <div className={`w-8 h-8 rounded-full ${
                    isConversationOpen ? 'bg-[#4CAF50]/60' : 'bg-[#F5E453]/60'
                  }`} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Error message with Fisher-Price style */}
          {error && (
            <div className="text-[#3772FF] text-center max-w-md p-4 bg-[#F5E453] rounded-xl border-4 border-white shadow-lg">
              {error}
            </div>
          )}
        </div>
        
        <VoiceChat 
          isOpen={isConversationOpen} 
          onError={setError}
          onSpeakingChange={setIsSpeaking}
        />
      </div>
    </div>
  );
};

export default Index;
