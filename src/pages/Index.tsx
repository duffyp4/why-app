
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
      {/* Header Section */}
      <div className="max-w-3xl mx-auto mb-12 flex justify-between items-start">
        <div className="text-[#3772FF] text-4xl font-bold leading-tight text-left">
          <div>Learn</div>
          <div>With</div>
          <div>Lara</div>
        </div>
        <div className="text-gray-600 text-xl mt-2">
          For when kids ask "y"
        </div>
      </div>

      {/* Button Section */}
      <div className="max-w-[200px] mx-auto bg-[#3772FF] rounded-3xl shadow-lg p-8 relative">
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
      </div>
          
      {error && (
        <div className="text-[#3772FF] text-center max-w-md mx-auto mt-4 p-4 bg-[#F5E453] rounded-xl border-4 border-white shadow-lg">
          {error}
        </div>
      )}
        
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

      <div className="max-w-2xl mx-auto mt-8 text-center space-y-4">
        <p className="text-gray-700 font-semibold text-xl">Try asking:</p>
        <div className="space-y-3">
          <p className="text-gray-600">"Why is the sky blue?"</p>
          <p className="text-gray-600">"Why does my dad drink coffee?"</p>
          <p className="text-gray-600">"Why do babies eat baby food?"</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
