
import { useEffect } from 'react';
import { useConversation } from '@11labs/react';

export const VoiceChat = ({ isOpen, onError }: { isOpen: boolean; onError: (message: string) => void }) => {
  const conversation = useConversation();

  useEffect(() => {
    if (isOpen) {
      const startConversation = async () => {
        try {
          const conversationId = await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm"
          });
          console.log('Started conversation:', conversationId);
        } catch (error) {
          console.error('Conversation error:', error);
          onError('Failed to start conversation');
        }
      };

      startConversation();

      return () => {
        conversation.endSession();
      };
    }
  }, [isOpen, conversation, onError]);

  return null;
};
