
import { useState } from "react";
import { Smile, MessageCircle, PhoneOff, Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceChat } from "@/components/VoiceChat";

const Index = () => {
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [error, setError] = useState('');
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const handleStartConversation = () => {
    console.log('Starting conversation...');
    setIsConversationOpen(true);
    setError('');
  };

  const handleEndConversation = () => {
    console.log('Ending conversation...');
    setIsConversationOpen(false);
    setError('');
    setIsUserSpeaking(false);
    setIsAISpeaking(false);
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
            <>
              <div className="flex gap-8 items-center justify-center">
                <div className={`flex flex-col items-center gap-2 transition-opacity ${isUserSpeaking ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`p-3 rounded-full bg-blue-100 ${isUserSpeaking ? 'animate-pulse' : ''}`}>
                    <Mic className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-blue-600">You</span>
                </div>

                <div className={`flex flex-col items-center gap-2 transition-opacity ${isAISpeaking ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`p-3 rounded-full bg-green-100 ${isAISpeaking ? 'animate-pulse' : ''}`}>
                    <Volume2 className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600">AI</span>
                </div>
              </div>

              <Button
                variant="destructive"
                size="lg"
                className="rounded-full"
                onClick={handleEndConversation}
              >
                <PhoneOff className="mr-2" />
                End Call
              </Button>
            </>
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
          onUserSpeakingChange={setIsUserSpeaking}
          onAISpeakingChange={setIsAISpeaking}
        />
      </div>
    </div>
  );
};

export default Index;
