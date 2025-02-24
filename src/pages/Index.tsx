
import { useState } from "react";
import { Phone, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceChat } from "@/components/VoiceChat";
import { useConversation } from '@11labs/react';
import { CallScreen } from "@/components/CallScreen";

const Index = () => {
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [isCallScreenVisible, setIsCallScreenVisible] = useState(false);
  const conversation = useConversation();

  const handleStartConversation = () => {
    console.log('Starting call screen...');
    setIsCallScreenVisible(true);
  };

  const handleCallStarted = () => {
    console.log('Starting conversation...');
    setIsConversationOpen(true);
    setError('');
  };

  const handleEndConversation = () => {
    console.log('Ending conversation...');
    setIsConversationOpen(false);
    setIsCallScreenVisible(false);
    setError('');
  };

  console.log('Current conversation state:', isConversationOpen);
  console.log('Speaking state:', isSpeaking);

  return (
    <div className="min-h-screen bg-white p-4 font-fredoka">
      <div className="max-w-3xl mx-auto bg-[#3772FF] rounded-3xl shadow-lg p-8">
        {/* Header with centered text */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Learn with Lara
          </h1>
          <div className="text-white text-lg">Click to call</div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Main interaction button with enhanced shadow */}
          <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-xl hover:shadow-2xl p-2 transform hover:scale-105 transition-all duration-200">
            <div className={`cursor-pointer ${isSpeaking ? 'animate-bounce' : ''}`}>
              <div 
                className={`w-24 h-24 rounded-full ${
                  isConversationOpen ? 'bg-[#4CAF50]' : 'bg-[#F5E453]'
                } flex items-center justify-center transition-colors border-4 border-white shadow-inner relative`}
                onClick={handleStartConversation}
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

        {isCallScreenVisible && (
          <CallScreen
            onCallStarted={handleCallStarted}
            onEndCall={handleEndConversation}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
