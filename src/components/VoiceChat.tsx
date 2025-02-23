
import { useEffect, useRef } from 'react';
import { useConversation } from '@11labs/react';

interface VoiceChatProps {
  isOpen: boolean;
  onError: (message: string) => void;
  onUserSpeakingChange: (speaking: boolean) => void;
  onAISpeakingChange: (speaking: boolean) => void;
}

export const VoiceChat = ({ isOpen, onError, onUserSpeakingChange, onAISpeakingChange }: VoiceChatProps) => {
  const conversation = useConversation();
  const sessionActiveRef = useRef(false);

  useEffect(() => {
    if (isOpen && !sessionActiveRef.current) {
      const startConversation = async () => {
        try {
          sessionActiveRef.current = true;
          const conversationId = await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm"
          });
          console.log('Started conversation:', conversationId);

          // Set up event listeners for speaking states
          conversation.on('userSpeechStart', () => {
            console.log('User started speaking');
            onUserSpeakingChange(true);
          });

          conversation.on('userSpeechEnd', () => {
            console.log('User stopped speaking');
            onUserSpeakingChange(false);
          });

          conversation.on('agentSpeechStart', () => {
            console.log('AI started speaking');
            onAISpeakingChange(true);
          });

          conversation.on('agentSpeechEnd', () => {
            console.log('AI stopped speaking');
            onAISpeakingChange(false);
          });

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
      onUserSpeakingChange(false);
      onAISpeakingChange(false);
    }
  }, [isOpen, conversation, onError, onUserSpeakingChange, onAISpeakingChange]);

  return null;
};
