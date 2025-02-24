
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
  const conversation = useConversation({
    onMessage: (message) => {
      console.log('Received message:', message);
      // Check if the message contains audio data
      if (message.type === 'audio') {
        console.log('Audio message received, duration:', message.duration);
        console.log('Setting speaking state to TRUE');
        if (onSpeakingChange) {
          onSpeakingChange(true);
          // Reset speaking state after audio message ends
          setTimeout(() => {
            console.log('Setting speaking state to FALSE');
            onSpeakingChange(false);
          }, message.duration || 1000);
        }
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      onError('Error during conversation');
    }
  });
  
  const sessionActiveRef = useRef(false);
  const { isSpeaking } = useConversation();

  // Debug speaking state changes with more detail
  useEffect(() => {
    if (onSpeakingChange) {
      console.log('Speaking state update:', {
        isSpeaking,
        timestamp: new Date().toISOString(),
        connectionStatus: conversation.status,
        sessionActive: sessionActiveRef.current,
        elementClass: document.querySelector('.animate-wave') ? 'present' : 'missing',
        animationActive: document.querySelector('.animate-wave')?.getAnimations().length || 0
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
            agentId: "bvV3UYHC4ytDbrYZI1Zm",
            initialMessages: [] // Add any initial messages if needed
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
