
import { Smile, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#D3E4FD] p-4">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-4 flex items-center justify-center gap-2">
              <Smile className="w-10 h-10 text-yellow-500" />
              WHY?
            </h1>
          </div>

          <div className="flex justify-center">
            <Button 
              size="icon"
              className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FEC6A1] to-[#FFA07A] hover:from-[#FFA07A] hover:to-[#FEC6A1]"
            >
              <MessageCircle className="h-12 w-12" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
