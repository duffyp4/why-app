
import { useState } from "react";
import { Smile, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceChat } from "@/components/VoiceChat";
import { useConversation, ConversationVisualizer } from '@11labs/react';

const Index = () => {
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');

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
    <div className="min-h-screen bg-[#D3E4FD] p-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4 flex items-center justify-center gap-2">
            <Smile className="w-10 h-10 text-yellow-500" />
            WHY?
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 flex items-center justify-center">
            <ConversationVisualizer
              isSpeaking={isSpeaking}
              isRecording={isConversationOpen}
              onClick={isConversationOpen ? handleEndConversation : handleStartConversation}
            />
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

export default Index;
