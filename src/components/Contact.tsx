"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, AlertCircle, RefreshCw } from "lucide-react";
import SectionHeading from "./SectionHeading";
import TerminalMockup from "./ui/TerminalMockup";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  
  const [step, setStep] = useState(0); // 0: name, 1: email, 2: subject, 3: message, 4: submitting, 5: success, 6: error
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activated, setActivated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  // Autofocus input on step changes
useEffect(() => {
  if (!activated) return;

  if (step <= 2) {
    inputRef.current?.focus();
  } else if (step === 3) {
    textareaRef.current?.focus();
  }
}, [step, activated]);
<div
  onClick={() => setActivated(true)}
></div>

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !inputValue.trim()) return;

    const trimmedValue = inputValue.trim();
    if (step === 0) {
      setName(trimmedValue);
      setInputValue("");
      setErrorMsg("");
      setStep(1);
      return;
    }

    if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedValue)) {
        setErrorMsg("Invalid email format. Please try again.");
        return;
      }
      setEmail(trimmedValue);
      setInputValue("");
      setErrorMsg("");
      setStep(2);
      return;
    }

    if (step === 2) {
      if (trimmedValue.length < 3) {
        setErrorMsg("Please enter a short subject for your message.");
        return;
      }
      setSubject(trimmedValue);
      setInputValue("");
      setErrorMsg("");
      setStep(3);
    }
  };

  useEffect(() => {
    if (step !== 5) return;

    setShowToast(true);
    const toastTimer = window.setTimeout(() => setShowToast(false), 3200);
    return () => window.clearTimeout(toastTimer);
  }, [step]);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !inputValue.trim()) return;

    const finalMessage = inputValue.trim();
    if (finalMessage.length < 10) {
      setErrorMsg("Please enter a longer message so I can help you properly.");
      return;
    }

    setMessage(finalMessage);
    setInputValue("");
    setErrorMsg("");
    setStep(4);
    setIsSubmitting(true);

    try {
      // Create an AbortController with 30 second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message: finalMessage,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to send the message.");
      }

      setStep(5);
    } catch (error: any) {
      if (error.name === "AbortError") {
        setErrorMsg("Request timed out. Please check your connection and try again.");
      } else {
        setErrorMsg(error?.message || "Failed to send message. Please try again later.");
      }
      setStep(6);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setInputValue("");
    setErrorMsg("");
    setShowToast(false);
    setStep(0);
  };

  return (
    <section id="contact" className="py-12 md:py-24 relative z-10 bg-card/30">
      <div className="container px-4 mx-auto max-w-5xl">
        <SectionHeading title="~/contact" subtitle="Send an encrypted payload message directly to my inbox." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-stretch">
          {/* Left Column: Contact Metadata */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Let&apos;s connect</h3>
              <p className="text-muted font-mono text-sm leading-relaxed max-w-md">
                I&apos;m always open to discussing web development, artificial intelligence, or new opportunities. Reach out to me via email or connect on social media.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm">
              <a href="mailto:nagpaltushar669@gmail.com" className="flex items-center gap-4 text-muted hover:text-primary transition-colors group p-4 rounded border border-border/50 bg-card/30 hover:border-primary/20">
                <div className="p-3 bg-primary/10 text-primary rounded group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted">Email Me</p>
                  <p className="text-foreground font-semibold">nagpaltushar669@gmail.com</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/tushar-nagpal-a6aa78300/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted hover:text-secondary transition-colors group p-4 rounded border border-border/50 bg-card/30 hover:border-secondary/20">
                <div className="p-3 bg-amber-500/10 text-secondary rounded group-hover:scale-110 transition-transform">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted font-semibold">LinkedIn</p>
                  <p className="text-foreground font-semibold">linkedin.com/in/tushar-nagpal</p>
                </div>
              </a>

              <a href="https://github.com/TusharNagpal-1" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted hover:text-foreground transition-colors group p-4 rounded border border-border/50 bg-card/30 hover:border-border">
                <div className="p-3 bg-card/40 text-foreground rounded group-hover:scale-110 transition-transform">
                  <Github size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted font-semibold">GitHub</p>
                  <p className="text-foreground font-semibold">github.com/TusharNagpal-1</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive CLI Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex"
          >
            <TerminalMockup title="mail_client.sh" className="flex flex-col h-full w-full">
              <div className="space-y-4 font-mono text-xs sm:text-sm h-full flex flex-col justify-between relative">
                {showToast && (
                  <div className="absolute right-4 top-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-emerald-200 text-xs font-mono shadow-lg backdrop-blur-sm">
                    Message received — confirmation sent to your inbox.
                  </div>
                )}
                {/* Standard CLI header */}
                <div className="space-y-2">
                  <div>
                    <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                    <span className="text-foreground">./send_message.sh</span>
                  </div>
                  <div className="text-muted select-none">
                    [Initializing contact handshake protocol...]
                  </div>
                </div>

                {/* Flow lines */}
                <div className="space-y-4 flex-grow py-4" aria-live="polite">
                  {/* Step 0: Name (Visible once step >= 0) */}
                  {step >= 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-secondary font-bold">?</span>
                        <span className="text-foreground font-semibold">Enter your name:</span>
                        {step > 0 && <span className="text-primary font-bold">{name}</span>}
                      </div>
                      
                      {step === 0 && (
                        <form onSubmit={handleNextStep} className="flex items-center gap-2 pl-4">
                          <span className="text-primary select-none">&gt;</span>
                          <input
                            ref={inputRef}
                            type="text"
                            required
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-transparent border-none outline-none p-0 text-foreground flex-grow focus:ring-0 focus:outline-none"
                            placeholder="John Doe"
                          />
                        </form>
                      )}
                    </div>
                  )}

                  {/* Step 1: Email (Visible once step >= 1) */}
                  {step >= 1 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-secondary font-bold">?</span>
                        <span className="text-foreground font-semibold">Enter your email:</span>
                        {step > 1 && <span className="text-primary font-bold">{email}</span>}
                      </div>
                      
                      {step === 1 && (
                        <form onSubmit={handleNextStep} className="flex items-center gap-2 pl-4">
                          <span className="text-primary select-none">&gt;</span>
                          <input
                            ref={inputRef}
                            type="email"
                            required
                            disabled={isSubmitting}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-transparent border-none outline-none p-0 text-foreground flex-grow focus:ring-0 focus:outline-none"
                            placeholder="john@example.com"
                          />
                        </form>
                      )}
                      
                      {errorMsg && step === 1 && (
                        <div className="text-red-400 pl-4 flex items-center gap-1.5">
                          <AlertCircle size={14} />
                          <span>{errorMsg}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Subject (Visible once step >= 2) */}
                  {step >= 2 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-secondary font-bold">?</span>
                        <span className="text-foreground font-semibold">Enter the subject:</span>
                        {step > 2 && <span className="text-primary font-bold">{subject}</span>}
                      </div>
                      
                      {step === 2 && (
                        <form onSubmit={handleNextStep} className="flex items-center gap-2 pl-4">
                          <span className="text-primary select-none">&gt;</span>
                          <input
                            ref={inputRef}
                            type="text"
                            required
                            disabled={isSubmitting}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-transparent border-none outline-none p-0 text-foreground flex-grow focus:ring-0 focus:outline-none"
                            placeholder="Project inquiry / collaboration"
                          />
                        </form>
                      )}
                      
                      {errorMsg && step === 2 && (
                        <div className="text-red-400 pl-4 flex items-center gap-1.5">
                          <AlertCircle size={14} />
                          <span>{errorMsg}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Message (Visible once step >= 3) */}
                  {step >= 3 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-secondary font-bold">?</span>
                        <span className="text-foreground font-semibold">Enter your message:</span>
                        {step > 3 && <span className="text-primary font-bold max-w-full truncate">{message}</span>}
                      </div>
                      
                      {step === 3 && (
                        <form onSubmit={handleMessageSubmit} className="flex items-start gap-2 pl-4">
                          <span className="text-primary select-none mt-1">&gt;</span>
                          <textarea
                            ref={textareaRef}
                            required
                            rows={3}
                            disabled={isSubmitting}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-transparent border-none outline-none p-0 text-foreground flex-grow focus:ring-0 focus:outline-none resize-none"
                            placeholder="Type your message here... (Press Enter to submit)"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleMessageSubmit(e);
                              }
                            }}
                          />
                        </form>
                      )}

                      {errorMsg && step === 3 && (
                        <div className="text-red-400 pl-4 flex items-center gap-1.5">
                          <AlertCircle size={14} />
                          <span>{errorMsg}</span>
                        </div>
                      )}
                    </div>
                  )}

                    {/* Step 4: Submitting */}
                  {step === 4 && (
                    <div className="space-y-2 pl-4 pt-2">
                      <div className="flex items-center gap-2 text-secondary">
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Encrypting and transmitting message...</span>
                      </div>
                      <div className="text-muted text-xs select-none">
                        {`[=============================>            ] 85%`}
                      </div>
                      <div className="text-muted text-xs">Connecting to mail server...</div>
                    </div>
                  )}

                  {/* Step 5: Success */}
                  {step === 5 && (
                    <div className="space-y-4 pl-4 pt-2">
                      <div className="text-primary font-bold flex items-center gap-2">
                        <span>&gt; Message sent successfully!</span>
                        <span className="inline-flex h-4 w-4 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <p className="text-muted text-xs">
                        Thank you for reaching out. I will review the message and respond back to you shortly.
                      </p>
                      <button
                        onClick={resetForm}
                        className="px-4 py-1.5 text-xs border border-primary/50 text-primary hover:bg-primary/10 rounded transition-colors"
                      >
                        ./send_another_message
                      </button>
                    </div>
                  )}

                  {/* Step 6: Error */}
                  {step === 6 && (
                    <div className="space-y-4 pl-4 pt-2">
                      <div className="text-red-400 font-bold flex items-center gap-1.5">
                        <AlertCircle size={16} />
                        <span>Transmission error occurred.</span>
                      </div>
                      <p className="text-muted text-xs">{errorMsg}</p>
                      <button
                        onClick={resetForm}
                        className="px-4 py-1.5 text-xs border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                      >
                        ./retry_handshake
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer CLI Prompt */}
                <div className="border-t border-border/50 pt-3" ref={terminalEndRef}>
                  <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                  {step < 4 && <span className="cursor-blink text-primary">_</span>}
                </div>

              </div>
            </TerminalMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
