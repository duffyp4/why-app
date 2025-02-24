
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

  // Debug websocket connection status
  useEffect(() => {
    console.log('Conversation connection status:', conversation.status);
  }, [conversation.status]);

  // Debug speaking state changes
  useEffect(() => {
    if (onSpeakingChange) {
      console.log('Speaking state update:', {
        isSpeaking,
        timestamp: new Date().toISOString(),
        connectionStatus: conversation.status
      });
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange, conversation.status]);

  useEffect(() => {
    if (isOpen && !sessionActiveRef.current) {
      const startConversation = async () => {
        try {
          sessionActiveRef.current = true;
          console.log('Starting new conversation session...');
          const conversationId = await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm"
          });
          console.log('Conversation session started successfully:', {
            conversationId,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Conversation session start error:', {
            error,
            timestamp: new Date().toISOString()
          });
          onError('Failed to start conversation');
          sessionActiveRef.current = false;
        }
      };

      startConversation();
    } else if (!isOpen && sessionActiveRef.current) {
      console.log('Ending conversation session...');
      conversation.endSession();
      sessionActiveRef.current = false;
    }
  }, [isOpen, conversation, onError]);

  return null;
};
