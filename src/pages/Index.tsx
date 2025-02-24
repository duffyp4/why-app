
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
            {/* Audio visualization line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white">
              <div 
                className={`h-full w-full ${
                  isSpeaking 
                    ? 'animate-wave' 
                    : 'bg-white'
                }`}
              />
            </div>
            
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
            @keyframes wave {
              0%, 100% {
                transform: scaleY(1);
              }
              25% {
                transform: scaleY(2);
              }
              50% {
                transform: scaleY(1);
              }
              75% {
                transform: scaleY(1.5);
              }
            }

            .animate-wave {
              animation: wave 1s ease-in-out infinite;
              transform-origin: center;
              background: white;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Index;
