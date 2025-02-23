
import { useEffect, useRef } from 'react';
import { useConversation } from '@11labs/react';

export const VoiceChat = ({ 
  isOpen, 
  onError,
  onSpeakingChange 
}: { 
  isOpen: boolean; 
  onError: (message: string) => void;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}) => {
  const conversation = useConversation();
  const sessionActiveRef = useRef(false);
  const { isSpeaking } = useConversation();

  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange]);

  useEffect(() => {
    if (isOpen && !sessionActiveRef.current) {
      const startConversation = async () => {
        try {
          sessionActiveRef.current = true;
          const conversationId = await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm"
          });
          console.log('Started conversation:', conversationId);
        } catch (error) {
          console.error('Conversation error:', error);
          onError('Failed to start conversation');
          sessionActiveRef.current = false;
        }
      };

      startConversation();
    } else if (!isOpen && sessionActiveRef.current) {
      console.log('Ending conversation session');
      conversation.endSession();
      sessionActiveRef.current = false;
    }
  }, [isOpen, conversation, onError]);

  return null;
};
