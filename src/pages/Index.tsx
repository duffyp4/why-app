
import { useState, useEffect, useRef } from "react";
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
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderCountRef.current++;
    console.log('Index component render:', {
      renderCount: renderCountRef.current,
      isConversationOpen,
      isSpeaking,
      isCallScreenVisible,
      stack: new Error().stack
    });
  });

  const handleStartConversation = () => {
    console.log('handleStartConversation called:', {
      currentIsCallScreenVisible: isCallScreenVisible,
      currentIsConversationOpen: isConversationOpen,
      stack: new Error().stack
    });
    setIsCallScreenVisible(true);
  };

  const handleCallStarted = () => {
    console.log('handleCallStarted called:', {
      currentIsCallScreenVisible: isCallScreenVisible,
      currentIsConversationOpen: isConversationOpen,
      stack: new Error().stack
    });
    setIsConversationOpen(true);
    setError('');
  };

  const handleEndConversation = () => {
    console.log('handleEndConversation called:', {
      currentIsCallScreenVisible: isCallScreenVisible,
      currentIsConversationOpen: isConversationOpen,
      stack: new Error().stack
    });
    setIsConversationOpen(false);
    setIsCallScreenVisible(false);
    setError('');
  };

  console.log('Current conversation state:', isConversationOpen);
  console.log('Speaking state:', isSpeaking);

  return (
    <div className="min-h-screen bg-white font-fredoka relative">
      <div className="p-4 pb-0">
        <div className="max-w-3xl mx-auto mb-[83px] md:mb-[62px]">
          <div className="flex items-start justify-between">
            <div className="relative inline-flex items-center scale-150 ml-4 md:ml-0">
              <MessageCircle className="w-24 h-24 text-[#33C3F0]" />
              <span className="absolute inset-0 flex items-center justify-center text-[#3772FF] font-bold text-2xl px-12" style={{ fontFamily: "'Schoolbell', cursive" }}>
                why?
              </span>
            </div>
            <div className="text-gray-600 text-[1.56rem] text-right" style={{ fontFamily: "'Chewy', cursive" }}>
              <div className="text-[#FEC6A1]">For when kids</div>
              <div className="text-[#ea384c] font-semibold">wonder</div>
            </div>
          </div>
        </div>

        <div className="max-w-[200px] mx-auto bg-[#3772FF] rounded-3xl shadow-lg p-8 relative mb-7">
          <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-2xl hover:shadow-[0_25px_25px_-5px_rgba(0,0,0,0.3)] p-2 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div>
              <div 
                className={`w-24 h-24 rounded-full ${
                  isConversationOpen ? 'bg-[#4CAF50]' : 'bg-[#F5E453]'
                } flex items-center justify-center transition-colors border-4 border-white shadow-inner relative group`}
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
          <div className="space-y-3" style={{ fontFamily: "'Schoolbell', cursive" }}>
            <p className="text-gray-600">"Why is the sky blue?"</p>
            <p className="text-gray-600">"Why does my dad drink coffee?"</p>
            <p className="text-gray-600">"Why do babies eat baby food?"</p>
          </div>
        </div>
      </div>

      <div className="h-[300px] md:h-[400px] relative">
        <div className="absolute w-full text-center bottom-2 z-10">
          <div className="text-gray-600" style={{ fontFamily: "'Schoolbell', cursive" }}>
            made with 🤘
          </div>
          <div className="text-gray-600" style={{ fontFamily: "'Schoolbell', cursive" }}>
            by uncle pj
          </div>
        </div>
        <img 
          src="/lovable-uploads/02eefade-b305-4cd9-810b-a90313601ff7.png" 
          alt="Cute giraffe under a tree"
          className="w-full h-full object-contain object-bottom"
        />
      </div>
    </div>
  );
};

export default Index;
