
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
          <div className="relative w-32 h-32">
            {/* First Ring */}
            <div 
              className={`absolute inset-[-16px] rounded-full bg-blue-500/50 ${
                isSpeaking ? 'animate-pulse-ring' : 'opacity-0'
              }`}
            />
            
            {/* Second Ring */}
            <div 
              className={`absolute inset-[-32px] rounded-full bg-blue-400/40 ${
                isSpeaking ? 'animate-pulse-ring animation-delay-200' : 'opacity-0'
              }`}
            />
            
            {/* Third Ring */}
            <div 
              className={`absolute inset-[-48px] rounded-full bg-blue-300/30 ${
                isSpeaking ? 'animate-pulse-ring animation-delay-400' : 'opacity-0'
              }`}
            />
            
            <Button 
              size="icon"
              className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#33C3F0] hover:from-[#33C3F0] hover:to-[#0EA5E9] transition-all duration-300"
              onClick={handleStartConversation}
            >
              <MessageCircle className="h-12 w-12" />
            </Button>
          </div>

          {isConversationOpen && (
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full mt-4"
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

        <style>
          {`
            @keyframes pulse-ring {
              0% {
                transform: scale(0.7);
                opacity: 0.5;
              }
              50% {
                transform: scale(1);
                opacity: 0.3;
              }
              100% {
                transform: scale(0.7);
                opacity: 0.5;
              }
            }

            .animate-pulse-ring {
              animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }

            .animation-delay-200 {
              animation-delay: 0.2s;
            }

            .animation-delay-400 {
              animation-delay: 0.4s;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Index;
