
import { useState } from "react";
import { Smile, MessageCircle, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceChat } from "@/components/VoiceChat";

const Index = () => {
  const [isConversationOpen, setIsConversationOpen] = useState(false);
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
          <Button 
            size="icon"
            className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FEC6A1] to-[#FFA07A] hover:from-[#FFA07A] hover:to-[#FEC6A1]"
            onClick={handleStartConversation}
          >
            <MessageCircle className="h-12 w-12" />
          </Button>

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
        
        <VoiceChat isOpen={isConversationOpen} onError={setError} />
      </div>
    </div>
  );
};

export default Index;
