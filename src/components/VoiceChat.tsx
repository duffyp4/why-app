
import { useEffect, useState } from 'react';
import { useConversation } from '@11labs/react';
import { useToast } from "@/components/ui/use-toast";

export const VoiceChat = ({ isOpen, onError }: { isOpen: boolean; onError: (message: string) => void }) => {
  const conversation = useConversation();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      console.log('Conversation opened, attempting to start');
      
      const startConversationFlow = async () => {
        try {
          // Start conversation immediately without dial tone
          await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm",
            overrides: {
              agent: {
                firstMessage: "Hello! I'm here to chat with you. What's on your mind?",
                language: "en",
              },
              tts: {
                voiceId: "XB0fDUnXU5powFXDhCwa",
              },
            },
          });
          console.log('Conversation started successfully');
          onError(''); // Clear any previous errors
        } catch (error) {
          console.error('Failed to start conversation:', error);
          onError('Failed to start the conversation. Please try refreshing the page.');
        }
      };

      startConversationFlow();
    }
  }, [isOpen, conversation, onError]);

  useEffect(() => {
    return () => {
      console.log('Cleaning up conversation');
      conversation.endSession();
    };
  }, [conversation]);

  return null;
};
