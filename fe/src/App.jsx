import { useEffect, useState } from "react";
import { buyProductService, getProductAmountService } from "@/services";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { useToast } from "@/hooks/use-toast";

function App() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        setisLoading(true);
        const { amount } = await getProductAmountService("korn");
        if (!amount) return;
        setAmount(amount);
      } catch (error) {
        console.error(error);
      } finally {
        setisLoading(false);
      }
    })();
  }, []);

  const onClick = async () => {
    try {
      const { amount } = await buyProductService("korn");
      toast({
        title: "Thank you so much",
        description: "Your purchase was successful",
        className: "bg-lime-500 border-lime-500",
      });
      setAmount(amount);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Your purchase was not successful, please try again later",
      });
    }
  };

  return (
    <>
      <Layout>
        <section className="grid min-h-[80vh] grid-rows-2 py-6">
          <h1 className=" text-2xl sm:text-4xl text-center">
            Uncle Bob&apos;s Farm E-Commerce
          </h1>
          <div className="flex flex-col items-center ">
            {!isLoading ? (
              <>
                <h2 className="text-xl sm:text-2xl mb-6">
                  Total amount of korn: {amount}
                </h2>
                <Button
                  onClick={onClick}
                  variant="outline"
                  className="w-48 sm:w-56"
                >
                  Buy
                </Button>
              </>
            ) : (
              <h2 className="text-xl sm:text-2xl mb-6 text-slate-50">
                Cargando...
              </h2>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

export default App;
