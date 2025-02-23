
import { useState } from "react";
import { Smile, MessageCircle, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceChat } from "@/components/VoiceChat";

const Index = () => {
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');

  const handleStartConversation = () => {
    console.log('Starting conversation...');
    setIsConversationOpen(true);
    setError(''); // Clear any previous errors
  };

  const handleEndConversation = () => {
    console.log('Ending conversation...');
    setIsConversationOpen(false);
    setError(''); // Clear any previous errors
  };

  console.log('Current conversation state:', isConversationOpen);
  console.log('Speaking state:', isSpeaking);

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
          <div className="relative">
            {/* First Ring */}
            <div className={`absolute inset-0 rounded-full bg-blue-400/30 transition-all duration-300 ${
              isSpeaking ? 'scale-[2] opacity-0' : 'scale-100 opacity-0'
            }`} style={{ 
              animation: isSpeaking ? 'ripple 2s linear infinite' : 'none',
              ...rippleStyles
            }} />
            
            {/* Second Ring */}
            <div className={`absolute inset-0 rounded-full bg-blue-400/30 transition-all duration-300 ${
              isSpeaking ? 'scale-[2] opacity-0' : 'scale-100 opacity-0'
            }`} style={{ 
              animation: isSpeaking ? 'ripple 2s linear infinite 0.5s' : 'none',
              ...rippleStyles
            }} />
            
            {/* Third Ring */}
            <div className={`absolute inset-0 rounded-full bg-blue-400/30 transition-all duration-300 ${
              isSpeaking ? 'scale-[2] opacity-0' : 'scale-100 opacity-0'
            }`} style={{ 
              animation: isSpeaking ? 'ripple 2s linear infinite 1s' : 'none',
              ...rippleStyles
            }} />
            
            <Button 
              size="icon"
              className="w-24 h-24 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#33C3F0] hover:from-[#33C3F0] hover:to-[#0EA5E9] transition-all duration-300 relative z-10"
              onClick={handleStartConversation}
            >
              <MessageCircle className="h-12 w-12" />
            </Button>

            <style>
              {`
                @keyframes ripple {
                  0% {
                    transform: scale(1);
                    opacity: 0.5;
                  }
                  100% {
                    transform: scale(2);
                    opacity: 0;
                  }
                }
              `}
            </style>
          </div>

          {isConversationOpen && (
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full"
              onClick={handleEndConversation}
            >
              <PhoneOff className="mr-2" />
              End Call
            </Button>
          )}
          
          {error && (
            <div className="text-red-500 text-center max-w-md p-4 bg-red-50 rounded-lg">
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

// Define ripple styles outside the component
const rippleStyles = {
  transformOrigin: 'center',
  willChange: 'transform, opacity'
} as const;

export default Index;
