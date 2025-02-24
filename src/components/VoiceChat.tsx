
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
  const sessionActiveRef = useRef(false);
  const { isSpeaking } = useConversation();
  const conversation = useConversation({
    onMessage: (message) => {
      console.log('Received message:', message);
      if (message.type === 'audio') {
        console.log('Audio message received, duration:', message.duration);
        console.log('Setting speaking state to TRUE', {
          messageType: message.type,
          hasOnSpeakingChange: !!onSpeakingChange,
          currentStatus: conversation.status
        });
        if (onSpeakingChange) {
          onSpeakingChange(true);
          setTimeout(() => {
            console.log('Setting speaking state to FALSE', {
              messageType: message.type,
              duration: message.duration,
              connectionStatus: conversation.status
            });
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

  useEffect(() => {
    if (onSpeakingChange) {
      console.log('Speaking state update:', {
        hookIsSpeaking: isSpeaking,
        timestamp: new Date().toISOString(),
        connectionStatus: conversation.status,
        sessionActive: sessionActiveRef.current,
        elementClass: document.querySelector('.animate-wave') ? 'present' : 'missing',
        animationActive: document.querySelector('.animate-wave')?.getAnimations().length || 0,
        stack: new Error().stack
      });
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange, conversation.status]);

  // Handle conversation session lifecycle
  useEffect(() => {
    if (isOpen && !sessionActiveRef.current) {
      const startConversation = async () => {
        try {
          console.log('Starting new conversation session...');
          sessionActiveRef.current = true;
          const conversationId = await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm",
            initialMessages: []
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
    }
    
    // Cleanup function that runs when isOpen becomes false or component unmounts
    return () => {
      if (sessionActiveRef.current) {
        console.log('Ending conversation session...');
        conversation.endSession();
        sessionActiveRef.current = false;
      }
    };
  }, [isOpen, conversation, onError]);

  return null;
};
