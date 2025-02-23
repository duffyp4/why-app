
import { Smile, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-4 flex items-center justify-center gap-2">
              <Smile className="w-10 h-10 text-yellow-500" />
              Chatty Kids Connection
            </h1>
            <p className="text-lg text-gray-600">A safe space for kids to chat and learn!</p>
          </div>

          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg h-16"
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Start Chatting
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
