
import { useState } from "react";
import { Smile, PhoneOff } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-[#FF444A] to-[#FF8C42] p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with Fisher-Price style */}
        <div className="bg-[#FF444A] rounded-b-3xl shadow-lg mb-8 p-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Smile className="w-10 h-10 text-[#FFD700]" />
            Talk & Learn
          </h1>
          <div className="text-white text-center text-lg">Your friendly chat companion!</div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Main interaction button with Fisher-Price style */}
          <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-lg p-2 transform hover:scale-105 transition-transform">
            <div className={`cursor-pointer ${isSpeaking ? 'animate-bounce' : ''}`}>
              <div 
                className={`w-24 h-24 rounded-full ${
                  isConversationOpen ? 'bg-[#FF8C42]' : 'bg-[#4CA6FF]'
                } flex items-center justify-center transition-colors border-4 border-white shadow-inner`}
                onClick={isConversationOpen ? handleEndConversation : handleStartConversation}
              >
                <div className={`w-16 h-16 rounded-full ${
                  isConversationOpen ? 'bg-[#FF6B6B]' : 'bg-[#73B8FF]'
                } flex items-center justify-center`}>
                  <div className={`w-8 h-8 rounded-full ${
                    isConversationOpen ? 'bg-[#FF8C42]' : 'bg-[#98CDFF]'
                  }`} />
                </div>
              </div>
            </div>
          </div>

          {/* Control button with Fisher-Price style */}
          {isConversationOpen && (
            <Button
              variant="default"
              size="lg"
              className="rounded-full bg-[#FF444A] hover:bg-[#FF6B6B] text-white font-bold text-lg shadow-lg border-4 border-white"
              onClick={handleEndConversation}
            >
              <PhoneOff className="mr-2 w-6 h-6" />
              Stop Talking
            </Button>
          )}
          
          {/* Error message with Fisher-Price style */}
          {error && (
            <div className="text-white text-center max-w-md p-4 bg-[#FF6B6B] rounded-xl border-4 border-white shadow-lg">
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
