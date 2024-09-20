import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import faqs from "/src/lib/faq.json";

const Faq = () => {
  return (
    <div className="container mx-auto my-5 p-5 md:p-0">
      <section>
        <h1 className=" text-3xl text-center font-semibold">FAQ</h1>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className=" p-4 rounded-md bg-blue-50">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </div>
  );
};

export default Faq;
