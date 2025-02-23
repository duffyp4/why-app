
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#D3E4FD] p-4">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-500">Chat Room</h1>
        </div>
      </div>
    </div>
  );
};

export default Chat;
