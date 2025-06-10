import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";

interface SummaryCardProps {
  subtotal: number;
  tax: number;
}

export function SummaryCard({ subtotal, tax }: SummaryCardProps) {
  return (
    <Card className="mx-4">
      <CardContent>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$ {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Impuesto</span>
          <span>$ {tax}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="font-bold">Total</span>
        <span className="font-bold">$ {subtotal + tax}</span>
      </CardFooter>
    </Card>
  );
}
