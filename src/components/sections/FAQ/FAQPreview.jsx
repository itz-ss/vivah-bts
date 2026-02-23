"use client";

import { useState } from "react";
import "./style/faqPreview.css";
import faqs from "@/data/faqs.json";
import PremiumTextReveal from "@/components/motion/PremiumText/PremiumTextReveal";

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section section-white">
      <div className="container">

        <div className="faq-header text-center">
          <PremiumTextReveal
            text="Frequently Asked Questions"
            type="heading"
            delay={0.6}
          />

          <PremiumTextReveal
            text="Everything you need to know about our wedding filming services."
            type="subheading"
            delay={0.3}
          />
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <div
              key={item.id}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                {item.question}
                <span className="faq-icon">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                role="region"
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}