import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) console.log("Payment successful. Session ID:", sessionId);
  }, [sessionId]);

  return <h1>Payment Successful!</h1>;
}

export default Success;
