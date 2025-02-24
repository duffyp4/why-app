
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
      if (message.type === 'audio') {
        console.log('Audio message received, duration:', message.duration);
        if (onSpeakingChange) {
          onSpeakingChange(true);
          setTimeout(() => {
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
  const mountCountRef = useRef(0);

  // Debug component lifecycle
  useEffect(() => {
    mountCountRef.current++;
    console.log('VoiceChat mounted/updated:', {
      mountCount: mountCountRef.current,
      isOpen,
      sessionActive: sessionActiveRef.current,
      conversationStatus: conversation.status,
      timestamp: new Date().toISOString()
    });

    return () => {
      console.log('VoiceChat cleanup triggered:', {
        mountCount: mountCountRef.current,
        isOpen,
        sessionActive: sessionActiveRef.current,
        conversationStatus: conversation.status,
        timestamp: new Date().toISOString()
      });
    };
  });

  useEffect(() => {
    console.log('Session state changed:', {
      isOpen,
      sessionActive: sessionActiveRef.current,
      conversationStatus: conversation.status,
      timestamp: new Date().toISOString()
    });

    if (isOpen && !sessionActiveRef.current) {
      const startConversation = async () => {
        try {
          console.log('Attempting to start session:', {
            sessionActive: sessionActiveRef.current,
            conversationStatus: conversation.status,
            timestamp: new Date().toISOString()
          });

          sessionActiveRef.current = true;
          const conversationId = await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm",
            initialMessages: []
          });

          console.log('Session started successfully:', {
            conversationId,
            sessionActive: sessionActiveRef.current,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Session start error:', {
            error,
            sessionActive: sessionActiveRef.current,
            timestamp: new Date().toISOString()
          });
          onError('Failed to start conversation');
          sessionActiveRef.current = false;
        }
      };

      startConversation();
    } else if (!isOpen && sessionActiveRef.current) {
      console.log('Ending session:', {
        sessionActive: sessionActiveRef.current,
        conversationStatus: conversation.status,
        timestamp: new Date().toISOString()
      });
      conversation.endSession();
      sessionActiveRef.current = false;
    }
  }, [isOpen, conversation, onError]);

  useEffect(() => {
    if (onSpeakingChange) {
      console.log('Speaking state update:', {
        hookIsSpeaking: isSpeaking,
        timestamp: new Date().toISOString(),
        connectionStatus: conversation.status,
        sessionActive: sessionActiveRef.current
      });
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange, conversation.status]);

  return null;
};
