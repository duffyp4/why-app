
import { useState } from "react";
import { Phone, PhoneOff, MessageCircle } from "lucide-react";
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
    <div className="min-h-screen bg-white font-fredoka relative">
      <div className="p-4 pb-0">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto mb-12 flex justify-between">
          <div className="text-5xl font-bold leading-tight text-left">
            <div className="text-[#EA526F]">Learn</div>
            <div className="text-[#FF8A5B]">with</div>
            <div className="text-[#EA526F]">Lara</div>
          </div>
          <div className="text-gray-600 text-xl mt-5 flex flex-col items-end justify-between">
            <span>For when kids <em className="font-semibold not-italic">wonder</em></span>
            <div className="relative inline-flex items-center scale-150 -ml-8">
              <MessageCircle className="w-24 h-24 text-[#25CED1]" />
              <span className="absolute inset-0 flex items-center justify-center text-[#3772FF] font-bold text-2xl px-12" style={{ fontFamily: "'Schoolbell', cursive" }}>
                why?
              </span>
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="max-w-[200px] mx-auto bg-[#3772FF] rounded-3xl shadow-lg p-8 relative mb-5">
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

        <div className="max-w-2xl mx-auto mb-10 text-center space-y-4">
          <p className="text-gray-700 font-semibold text-xl">Try asking:</p>
          <div className="space-y-3">
            <p className="text-gray-600">"Why is the sky blue?"</p>
            <p className="text-gray-600">"Why does my dad drink coffee?"</p>
            <p className="text-gray-600">"Why do babies eat baby food?"</p>
          </div>
        </div>
      </div>

      {/* Transparent Container with Giraffe Image */}
      <div className="h-[400px] bg-white/5 backdrop-blur-[2px]">
        <img 
          src="/lovable-uploads/b96e232b-7284-4e6b-bf25-db8579ac1102.png" 
          alt="Cute giraffe under a tree"
          className="w-full h-full object-contain object-bottom"
        />
      </div>
    </div>
  );
};

export default Index;
